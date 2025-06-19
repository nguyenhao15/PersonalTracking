package com.haro._5.dtos.TransferSavingDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateSavingTransferDTO {

    private String savingAndInvestId;
    private LocalDate sendingDate;

    //    Sending || throwing
    private Boolean type;

    private Double amount;
    private String walletId;
    private Double fee;
}
