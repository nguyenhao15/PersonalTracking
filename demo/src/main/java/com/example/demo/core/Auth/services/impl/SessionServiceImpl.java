package com.example.demo.core.Auth.services.impl;

import com.example.demo.core.Auth.models.Session;
import com.example.demo.core.Auth.services.SessionService;
import com.example.demo.core.Exceptions.InvalidCredentialsException;
import com.example.demo.core.Security.jwt.JwtUtils;
import com.example.demo.repositories.postgreSQL.core.Auth.SessionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class SessionServiceImpl implements SessionService {


    @Value("${spring.app.jwt.refresh-expiration}")
    private int refreshExpirationMs;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public Session createRefreshToken(String username) {
        Session existSession = sessionRepository.findByUsername(username);
        if (existSession != null) {
            return existSession;
        }
        Session session = new Session();
        Instant expiryDate = Instant.now().plusMillis(refreshExpirationMs);
        String refreshToken = jwtUtils.generateRefreshToken(username);

        session.setUsername(username);

        session.setExpiryDate(expiryDate);
        session.setRefreshToken(refreshToken);

        session = sessionRepository.save(session);

        return session;
    }

    @Override
    public Boolean verifyRefreshToken(Session refreshToken) {
        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            sessionRepository.delete(refreshToken);
            throw new InvalidCredentialsException("Refresh token was expired. Please make a new signin request");
        }
        return true;
    }

    @Override
    public Session findByRefreshToken(String refreshToken) {
        Session userSession = sessionRepository.findByRefreshToken(refreshToken);
        if (userSession == null) {
            throw new InvalidCredentialsException("Invalid token");
        }
        return userSession;
    }

    @Override
    public void deleteRefreshToken(String refreshToken) {
        Session session = sessionRepository.findByRefreshToken(refreshToken);
        sessionRepository.delete(session);
    }

    @Override
    public void deleteRefreshTokenByUserId(String userId) {
        Session userSession = sessionRepository.findByUsername(userId);
        if (userSession != null) {
            sessionRepository.delete(userSession);
        }
    }
}
