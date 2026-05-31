package com.example.demo.core.Auth.controllers;

import com.example.demo.core.Auth.dtos.user.*;
import com.example.demo.core.Auth.services.UserService;
import com.example.demo.core.annotation.InstanceApiController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@InstanceApiController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = userService.login(loginRequest);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody CreateUserRequest createUserRequest) {
        UserDTO userDTO = userService.createNewUser(createUserRequest);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken() {
        String accessToken = userService.refreshToken();
        return ResponseEntity.ok(accessToken);
    }

    @PostMapping("/log-out")
    public ResponseEntity<?> logOut() {
        String logOutMessage = userService.logout();
        return ResponseEntity.ok(logOutMessage);
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
