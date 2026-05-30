package com.example.demo.core.Auth.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryDto {
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
}
