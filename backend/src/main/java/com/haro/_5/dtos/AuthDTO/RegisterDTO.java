package com.haro._5.dtos.AuthDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class RegisterDTO {

    @NotBlank(message = "Username is required")
    private String username;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).{6,}", message = "Password must be at least 6 characters and contain both letters and numbers")
    private String password;

    @Email(message = "Email is invalid")
    @NotNull(message = "Email is required")
    private String email;

    @NotBlank(message = "Display name is required")
    private String userDisplayName;

    @Builder.Default
    private String role = "USER";
}
