package com.haro._5.dtos.TransactionDTO;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = false)
public class UpdateTransactionRequest {

    public String expensesName;
    public String walletId;
    public Boolean type;
    public String category;
    public LocalDate date;
    public Double amount;
    public String importance;
    private String createdBy;

}
