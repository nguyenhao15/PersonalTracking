package com.haro._5.repositories;

import com.haro._5.models.Transaction;
import org.springframework.cglib.core.Local;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepo extends MongoRepository<Transaction, String> {
    List<Transaction> findByCreatedByAndType(String createdBy, Boolean type);
    List<Transaction> findByCreatedByAndDateBetweenAndType(String createdBy, LocalDateTime start, LocalDateTime end, Boolean type);
}
