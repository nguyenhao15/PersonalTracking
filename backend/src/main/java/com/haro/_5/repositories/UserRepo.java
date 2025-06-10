package com.haro._5.repositories;

import com.haro._5.models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<Users, String> {
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);
}
