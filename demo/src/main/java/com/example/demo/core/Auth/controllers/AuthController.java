package com.example.demo.core.Auth.controllers;

import com.example.demo.core.Auth.dtos.user.LoginRequest;
import com.example.demo.core.Auth.dtos.user.LoginResponse;
import com.example.demo.core.Auth.dtos.user.UpdatePassword;
import com.example.demo.core.Auth.dtos.user.UserDTO;
import com.example.demo.core.Auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = userService.login(loginRequest);
        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken() {
        try {
            String accessToken = userService.refreshToken();
            return ResponseEntity.ok(accessToken);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping("/log-out")
    public ResponseEntity<?> logOut() {
        String logOutMessage = userService.logout();
        return ResponseEntity.ok(logOutMessage);
    }

    @GetMapping("/staff-profile")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        UserDTO userDTO = userService.getMyInfo();
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePassword newPassword) {
        String oldPassword = newPassword.getCurrentPassword();
        String newPasswordValue = newPassword.getNewPassword();
        userService.updatePassword(oldPassword, newPasswordValue);
        return ResponseEntity.ok("Password updated");
    }

    @PatchMapping("/activate-account")
    public ResponseEntity<?> activateUser(@RequestBody String newPassword) {
        return ResponseEntity.ok(userService.activateUser(newPassword));
    }

}
