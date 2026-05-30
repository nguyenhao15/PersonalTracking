package com.example.demo.domains.ExpensesTracker.wallet.dto.wallet;

import com.example.demo.domains.ExpensesTracker.wallet.entity.WalletTypeEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class WalletRequestDto {

    private String walletName;

    private Long balance;

    private String description;

    private Boolean isActive;

    private String currency;

    private String ownerId;

    private WalletTypeEnum walletType;

}
