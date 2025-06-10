package com.haro._5.repositories;

import com.haro._5.models.SavingAndInvest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingAndInvestmentRepo extends MongoRepository<SavingAndInvest, String> {
}
