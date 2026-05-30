package com.example.demo.core.Auth.services.impl;

import com.example.demo.core.Auth.dtos.user.*;
import com.example.demo.core.Auth.mapper.UserMapper;
import com.example.demo.core.Auth.models.Session;
import com.example.demo.core.Auth.models.Users;
import com.example.demo.core.Auth.services.SessionService;
import com.example.demo.core.Auth.services.UserService;
import com.example.demo.core.Exceptions.InvalidCredentialsException;
import com.example.demo.core.Exceptions.ResourceNotFoundException;
import com.example.demo.core.Security.jwt.JwtUtils;
import com.example.demo.core.Security.utils.SecurityUtil;
import com.example.demo.repositories.postgreSQL.core.Auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SessionService refreshTokenService;

    @Value("${spring.app.tempPassword}")
    private String tempPassword;

    @Autowired
    private SecurityUtil securityUtil;

    @Value("${spring.app.jwt.refresh-expiration}")
    private int refreshTokenExpirationMs;

    @Override
    public Users getUserEntityInfo() {
        String username = securityUtil.getCurrentUserDetails().getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
    }

    @Override
    public UserDTO getMyInfo() {
        CustomUserDetails customUserDetails = securityUtil.getCurrentUserDetails();
        return userMapper.formCustomUserDetailsToUserDto(customUserDetails);
    }

    @Override
    public UserDTO createNewUser(CreateUserRequest createUserRequest) {
            Users user = userMapper.fromCreateRequestToEntity(createUserRequest);
            Users createdUser = userRepository.save(user);
            // TODO: CREATE DEFAULT DATA SET
            return userMapper.toDto(createdUser);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication;
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        boolean isAlreadyExist = userRepository.existsByUsername(username);
        if (!isAlreadyExist) {
            throw new ResourceNotFoundException("Staff", "StaffId", username);
        }

        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (AuthenticationException exception) {
            throw new InvalidCredentialsException("Sai thông tin đăng nhập hoặc mật khẩu!!");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtils.generateAccessToken(username);

        Session refreshTokenSession = refreshTokenService.createRefreshToken(username);

        jwtUtils.setRefreshTokenInCookie(refreshTokenSession.getRefreshToken(), refreshTokenExpirationMs);

        UserDTO userDTO = getMyInfo();

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setAccessToken(accessToken);
        loginResponse.setUserDTO(userDTO);

        return loginResponse;
    }

    @Override
    public String logout() {
        String refreshTokenValue = jwtUtils.getRefreshTokenInCookieValue();
        if (refreshTokenValue != null) {
            refreshTokenService.deleteRefreshToken(refreshTokenValue);
        }
        jwtUtils.setRefreshTokenInCookie("refreshToken", 0);
        SecurityContextHolder.clearContext();
        return "Log out successfully!!";
    }

    @Override
    public String refreshToken() {
        String getRefreshTokenValue = jwtUtils.getRefreshTokenInCookieValue();
        Session refreshToken = refreshTokenService.findByRefreshToken(getRefreshTokenValue);
        Boolean isValidToken = refreshTokenService.verifyRefreshToken(refreshToken);

        if (!isValidToken) {
            logout();
            throw new InvalidCredentialsException("Refresh Token expired or invalid. Please login again");
        }
        String staffId = refreshToken.getUsername();

        return jwtUtils.generateAccessToken(staffId);
    }

    @Override
    public void updatePassword(String oldPassword, String newPassword) {
        Users user = getUserEntityInfo();
        boolean isValidPassword = encoder.matches(oldPassword, user.getPassword());
        if (!isValidPassword) {
            throw new InvalidCredentialsException("Old password is incorrect");
        }
        user.setPassword(encoder.encode(newPassword));
        Users saved = userRepository.save(user);
//        evictUserCachesByUsername(saved.getUsername());
        userMapper.toDto(saved);
    }

    @Override
    public UserDTO activateUser(String updatePassword) {
        String encodedPassword = encoder.encode(updatePassword);
        Users user = getUserEntityInfo();

        user.setPassword(encodedPassword);
        user.setEnabled(true);

        Users updatedUser = userRepository.save(user);

//        evictUserCachesByUsername(updatedUser.getUsername());
        return userMapper.toDto(updatedUser);
    }

    @Override
    public UserDTO resetPassword(String userId) {
        Users user = getUserEntityInfo();
        user.setPassword(encoder.encode(tempPassword));
        user.setEnabled(false);
        refreshTokenService.deleteRefreshTokenByUserId(userId);
        Users updatedUser = userRepository.save(user);
//        evictUserCachesByUsername(user.getUsername());
        return userMapper.toDto(updatedUser);
    }

    @Override
    public UserDTO updateMyInfo(String userId, UserDTO updateUserRequest) {
        Users user = getUserEntityInfo();
        userMapper.updateUserInfo(updateUserRequest, user);
        Users savedInfo = userRepository.save(user);
//        evictUserCachesByUsername(savedInfo.getUsername());
        return userMapper.toDto(savedInfo);
    }
}
