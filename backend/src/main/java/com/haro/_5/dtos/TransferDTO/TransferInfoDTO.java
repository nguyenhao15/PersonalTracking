package com.haro._5.dtos.TransferDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
@Data
public class TransferInfoDTO {

    private String _id;

    private String sourceWalletId;
    private String destinationWalletId;
    private Double amount;
    private Double transferFee;
    private String note;
    private LocalDate date;
    private String createdBy;


}
