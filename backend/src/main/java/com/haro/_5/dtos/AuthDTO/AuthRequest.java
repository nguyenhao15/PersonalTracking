package com.haro._5.dtos.AuthDTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AuthRequest {

    private String username;
    private String password;
}
