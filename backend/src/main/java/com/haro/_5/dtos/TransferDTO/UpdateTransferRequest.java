package com.haro._5.dtos.TransferDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = false)
public class UpdateTransferRequest {

    public String sourceWalletId;
    public String destinationWalletId;
    public Double amount;
    public Double transferFee;
    public String note;
    private String createdBy;
    public LocalDate date;
}
