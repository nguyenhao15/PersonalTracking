package com.example.demo.core.Auth.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class LoginResponse {
    private UserDTO userDTO;
    private String accessToken;
}
