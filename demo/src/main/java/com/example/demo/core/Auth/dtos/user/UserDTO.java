package com.example.demo.core.Auth.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String staffId;
    private String fullName;
    private String email;
    private String systemRole;

    private boolean accountNonLocked;
    private boolean accountNonExpired;
    private boolean enabled;

    private boolean credentialsNonExpired;

    //    private LocalDate credentialsExpiryDate;
//    private LocalDate accountExpiryDate;
//    private String twoFactorSecret;
//    private String signUpMethod;

    private boolean isTwoFactorEnabled;
    private Instant createdDate;
    private Instant updatedDate;
}
