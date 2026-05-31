package com.example.demo.domains.ExpensesTracker.wallet.dto.wallet;

import com.example.demo.domains.ExpensesTracker.wallet.entity.WalletTypeEnum;

public record WalletSummaryInfo(
        Long id,

        String walletName,

        Long balance,

        String description,

        WalletTypeEnum walletType,

        Double priority
) {
}
