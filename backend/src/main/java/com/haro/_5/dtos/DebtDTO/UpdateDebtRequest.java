package com.haro._5.dtos.DebtDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDebtRequest {

    private String _id;

    @NotBlank(message = "WalletId is required")
    private String walletId;

    @NotNull(message = "amount is required")
    private Long amount;

    @NotNull(message = "date is required")
    private LocalDate date;

}
