package com.haro._5.services;

import com.haro._5.dtos.AuthDTO.AuthRequest;
import com.haro._5.dtos.AuthDTO.AuthResponse;
import com.haro._5.dtos.AuthDTO.RegisterDTO;
import com.haro._5.dtos.AuthDTO.UserInfoDTO;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.exceptions.BadRequestException;
import com.haro._5.mappers.UserMapper;
import com.haro._5.models.UserPrincipal;
import com.haro._5.models.Users;
import com.haro._5.repositories.UserRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private ResponseBuilder responseBuilder;

    public ResponseEntity<?> register(RegisterDTO request, HttpServletResponse response) {

        if (repo.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email is already registered");
        }
        if (repo.findByUsername(request.getUsername()).isPresent()) {
            throw new BadRequestException("Username is already taken");
        }
        Users user = Users.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .userDisplayName(request.getUserDisplayName())
                .email(request.getEmail())
                .role(request.getRole() != null ? request.getRole() : "USER")
                .build();

        Users savedUser = repo.save(user);
        String accessToken = jwtService.generateAccessToken(request.getUsername());
        String refreshToken = jwtService.generateRefreshToken(request.getUsername());

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshCookie);

        Cookie accessCookie = new Cookie("accessToken", accessToken);
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(false); // nên = true nếu deploy trên HTTPS
        accessCookie.setPath("/");
        accessCookie.setMaxAge(15 * 60);

        response.addCookie(refreshCookie);
        response.addCookie(accessCookie);


        return responseBuilder.success(savedUser, "User register successfully");

    }

    public ResponseEntity<?> verify(AuthRequest request, HttpServletResponse response) {
        try {
            Authentication authentication =
                    authManager.authenticate
                            (
                                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
                            );

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            String accessToken = jwtService.generateAccessToken(request.getUsername());
            String refreshToken = jwtService.generateRefreshToken(request.getUsername());

            Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
            refreshCookie.setHttpOnly(true);
            refreshCookie.setSecure(false);
            refreshCookie.setPath("/");
            refreshCookie.setMaxAge(7 * 24 * 60 * 60);

            Cookie accessCookie = new Cookie("accessToken", accessToken);
            accessCookie.setHttpOnly(true);
            accessCookie.setSecure(false); // nên = true nếu deploy trên HTTPS
            accessCookie.setPath("/");
            accessCookie.setMaxAge(15 * 60);

            response.addCookie(refreshCookie);
            response.addCookie(accessCookie);


            Map<String, Object> res = new HashMap<>();
            res.put("user", userPrincipal);
            return ResponseEntity.ok(res);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user name or password");
        }
    }

    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                }
            }
        }

        if (refreshToken == null || !jwtService.isRefreshTokenValid(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
        }

        String username = jwtService.extractUsername(refreshToken);

        String newAccessToken = jwtService.generateAccessToken(username);

        // Gửi accessToken mới dưới dạng cookie
        Cookie newAccessCookie = new Cookie("accessToken", newAccessToken);
        newAccessCookie.setHttpOnly(true);
        newAccessCookie.setSecure(false); // set true ở production
        newAccessCookie.setPath("/");
        newAccessCookie.setMaxAge(15 * 60); // 15 phút

        response.addCookie(newAccessCookie);


        return ResponseEntity.ok(newAccessCookie);
    }
}
