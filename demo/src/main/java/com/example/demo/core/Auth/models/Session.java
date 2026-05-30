package com.example.demo.core.Auth.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;


import java.time.Instant;


@Data
@Entity(name = "sessions")
@AllArgsConstructor
@NoArgsConstructor
@Table(
        uniqueConstraints = {},
        indexes = {
                @Index(name = "idx_user_name", columnList = "username",unique = true),
                @Index(name = "idx_token", columnList = "refreshToken",unique = true),
        }
)
public class Session {

    @Id
    private Long id;

    private String username;

    private String refreshToken;

    private Instant expiryDate;

    @CreatedDate
    private Instant createdDate;

    @LastModifiedDate
    private Instant updatedDate;

    @CreatedBy
    private String createdBy;

    @LastModifiedBy
    private String updatedBy;
}
