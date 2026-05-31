// CreateUserRequest.java
package com.example.demo.core.Auth.dtos.user;

import com.example.demo.core.Auth.models.SystemRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserRequest {

    @NotBlank(message = "Username must not be blank")
    private String username;

    @NotBlank(message = "FullName must not be blank")
    private String fullName;

    @NotBlank
    @Email(message = "Invalid email")
    private String email;

    private String password;

    private SystemRole userRole;

}
