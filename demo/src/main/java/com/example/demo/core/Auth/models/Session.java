package com.example.demo.core.Auth.models;

import com.example.demo.utils.BaseEntity.Jpa.BaseAuditJpaModel;
import jakarta.persistence.*;
import lombok.*;


import java.time.Instant;


@Entity(name = "sessions")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"username","refreshToken"})
        },
        indexes = {
                @Index(name = "idx_user_name", columnList = "username",unique = true),
                @Index(name = "idx_token", columnList = "refreshToken",unique = true),
        }
)
public class Session extends BaseAuditJpaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String refreshToken;

    private Instant expiryDate;
}
