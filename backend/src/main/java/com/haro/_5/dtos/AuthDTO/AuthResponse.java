package com.haro._5.dtos.AuthDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private UserInfoDTO user;
    private String token;
    private String tokenType = "Bearer";

}
