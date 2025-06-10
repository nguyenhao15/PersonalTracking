package com.haro._5.repositories;

import com.haro._5.models.Transfer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepo extends MongoRepository<Transfer, String> {
}
