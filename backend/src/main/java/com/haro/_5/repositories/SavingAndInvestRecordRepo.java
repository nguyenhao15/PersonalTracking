package com.haro._5.repositories;

import com.haro._5.models.SIRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingAndInvestRecordRepo extends MongoRepository<SIRecord, String> {
}
