package com.example.demo.core.Auth.models;

import com.example.demo.utils.BaseEntity.Jpa.BaseAuditJpaModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users",
        indexes = {
                @Index(name = "idx_user_name", columnList = "username",unique = true),
                @Index(name = "idx_email", columnList = "email",unique = true),
        })
public class Users extends BaseAuditJpaModel {

    @Id
    private Long id;

    @NotBlank
    private String fullName;

    @NotBlank
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private String userRole;

    @Size(max = 120)
    @JsonIgnore
    private String password;

    private boolean accountNonLocked = true;
    private boolean accountNonExpired = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;

    private LocalDate credentialsExpiryDate;
    private LocalDate accountExpiryDate;

    private String twoFactorSecret;
    private boolean isTwoFactorEnabled = false;
    private String signUpMethod;

    public Users(String userName, String email, String password) {
        this.username = Users.this.username;
        this.email = email;
        this.password = password;
    }

    public Users(String username, String email) {
        this.username = Users.this.username;
        this.email = email;
    }
}
