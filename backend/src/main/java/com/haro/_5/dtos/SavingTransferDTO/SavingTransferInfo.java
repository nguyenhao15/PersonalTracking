package com.haro._5.dtos.TransferSavingDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SavingTransferInfo {

    private String _id;

    private String savingAndInvestId;
    private LocalDate sendingDate;

    private Boolean type;
    //    Sending || throwing

    private Double amount;
    private String walletId;
    private Double fee;

    @CreatedDate
    private Instant createdAt;
    @CreatedBy
    private String username;

}
