package com.example.demo.core.Auth.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdatePassword {
    private String currentPassword;
    private String newPassword;
}
