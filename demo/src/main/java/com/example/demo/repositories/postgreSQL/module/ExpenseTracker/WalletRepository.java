package com.example.demo.repositories.postgreSQL.module.ExpenseTracker;

import com.example.demo.domains.ExpensesTracker.wallet.entity.WalletEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<WalletEntity, Long>, JpaSpecificationExecutor<WalletEntity> {

    List<WalletEntity> findByUserId(Long userId, Sort sort);
}
