package com.haro._5.exceptions;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;
import java.security.SignatureException;
import java.util.Map;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String errorMsg = getString(authException);

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.getWriter().write(objectMapper.writeValueAsString(Map.of(
                "status", HttpStatus.UNAUTHORIZED.value(),
                "error", errorMsg,
                "path", request.getRequestURI()
        )));
    }

    private static String getString(AuthenticationException authException) {
        Throwable cause = authException.getCause();
        String errorMsg = "";

        if (cause instanceof ExpiredJwtException) {
            errorMsg = "Token expired";
        } else if (cause instanceof SignatureException) {
            errorMsg = "Invalid token signature";
        } else if (cause instanceof MalformedJwtException) {
            errorMsg = "Invalid JWT format";
        } else if (authException instanceof BadCredentialsException) {
            errorMsg = authException.getMessage();
        }
        return errorMsg;
    }
}
