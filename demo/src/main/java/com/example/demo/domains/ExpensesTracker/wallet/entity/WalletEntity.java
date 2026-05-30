package com.example.demo.domains.ExpensesTracker.wallet.entity;

import com.example.demo.utils.BaseEntity.Jpa.BaseAuditJpaModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity(name = "wallet")
@AllArgsConstructor
@NoArgsConstructor
public class WalletEntity extends BaseAuditJpaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String walletName;

    private Long balance;

    private String description;

    private Boolean isActive;

    private String currency;

    private String ownerId;

    @Enumerated(EnumType.STRING)
    private WalletTypeEnum walletType;
}
