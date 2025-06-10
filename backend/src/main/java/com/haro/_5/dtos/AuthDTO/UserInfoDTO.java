package com.haro._5.dtos.AuthDTO;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserInfoDTO {

    private String _id;
    private String userDisplayName;
    private String username;
    private String email;
    private String role;
}
