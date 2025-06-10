package com.haro._5.repositories;

import com.haro._5.models.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface WalletRepo extends MongoRepository<Wallet, String> {
    Optional<Wallet> findByWalletId(String walletId);

    List<Wallet> findByCreatedBy(String createdBy);
}
