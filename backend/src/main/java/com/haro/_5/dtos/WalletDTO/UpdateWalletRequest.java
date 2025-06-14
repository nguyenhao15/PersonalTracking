package com.haro._5.dtos.WalletDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = false)
public class UpdateWalletRequest {

    public String walletId;
    public String name;
    public String type;
    public Boolean isActive;
    private String walletIcon;
}
