package com.haro._5.repositories;

import com.haro._5.models.Debt;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DebtRepo extends MongoRepository<Debt, String> {
}
