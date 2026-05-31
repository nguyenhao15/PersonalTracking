package com.example.demo.domains.ExpensesTracker.wallet.dto.wallet;

import com.example.demo.domains.ExpensesTracker.wallet.entity.WalletTypeEnum;

public record WalletInfoDto (
         Long id,

         String walletName,

         Long balance,

         String description,

         Boolean isActive,

         String currency,

         Long ownerId,

         Double priority,

         WalletTypeEnum walletType
) { }
