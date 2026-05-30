package com.example.demo.core.Auth.services;

import com.example.demo.core.Auth.models.Session;

public interface SessionService {
    Session createRefreshToken(String username);

    Boolean verifyRefreshToken(Session refreshToken);

    Session findByRefreshToken(String refreshToken);

    void deleteRefreshToken(String refreshToken);

    void deleteRefreshTokenByUserId(String userId);
}
