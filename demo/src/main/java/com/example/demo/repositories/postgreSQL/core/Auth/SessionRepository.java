package com.example.demo.repositories.postgreSQL.core.Auth;

import com.example.demo.core.Auth.models.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    Session findByRefreshToken(String refreshToken);

    Session findByUsername(String username);
}
