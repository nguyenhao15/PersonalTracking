package com.haro._5.dtos.WalletDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.time.Instant;

@AllArgsConstructor
@Getter
@Data
public class WalletInfoDTO {
    private String _id;
    private String walletId;
    private String name;
    private String type;
    private String currency;
    private Boolean isActive;
    private Double initial;
    private Double balance;
    private String createdBy;
    private Instant createdAt;
    private Instant updatedAt;

}
