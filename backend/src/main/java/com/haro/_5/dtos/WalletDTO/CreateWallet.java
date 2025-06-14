package com.haro._5.dtos.WalletDTO;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = false)
public class CreateWallet {

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "WalletId is required")
    private String walletId;

    @NotBlank(message = "Type is required")
    private String type; // normal | saving

    @Builder.Default
    private String currency = "VND";

    private String walletIcon;

    @Builder.Default
    private double balance = 0;

    private String createdBy;

    @Builder.Default
    private double initial = 0;


}
