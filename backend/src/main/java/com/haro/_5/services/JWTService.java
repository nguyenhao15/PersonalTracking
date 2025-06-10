package com.haro._5.services;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.function.Function;

@Service
public class JWTService {

    @Value("${SECRET_KEY}")
    private String secretKey;


    private String createToken(String username, long expirationMillis) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(getKey(), Jwts.SIG.HS256)
                .compact();
    }

    public String generateAccessToken(String username) {
        long expirationTimeMs = 15 * 60 * 1000;
        return createToken(username, expirationTimeMs);
    }

    public String generateRefreshToken(String username) {
        long expirationTimeMs = 7 * 24 * 60 * 60 * 1000;
        return createToken(username, expirationTimeMs);
    }


    private SecretKey getKey() {
        byte[] keyBites = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBites);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extracAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extracAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

//
//        try {
//            return Jwts.parser()
//                    .verifyWith(getKey())
//                    .build()
//                    .parseSignedClaims(token)
//                    .getPayload();
//        } catch (JwtException e) {
//            throw new JwtException("Invalid JWT Token " + e);
//        }
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        
        final String username = extractUsername(token);
        Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token);
        return true;

//        try {
//            Jwts.parser()
//                    .verifyWith(getKey())
//                    .build()
//                    .parseSignedClaims(token);
//            return true;
//        } catch (JwtException e) {
//            System.out.println("Invalid JWT " + e.getMessage());
//            return false;
//        }
    }

    public boolean isTokeExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isRefreshTokenValid(String token) {
        String username = extractUsername(token);
        return !isTokeExpired(token);

//        try {
//            String username = extractUsername(token);
//            return !isTokeExpired(token);
//        } catch (Exception e) {
//            System.out.println("Token is invalid");
//            return false;
//        }
    }
}
