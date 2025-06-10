package com.haro._5.dtos.TransactionDTO;


import lombok.AllArgsConstructor;
import lombok.Data;


import java.time.LocalDate;


@AllArgsConstructor
@Data
public class TransactionInfoDTO {

    private String _id;
    private String expensesName;
    private String walletId;
    private Boolean type;
    private String category;
    
    private String createdBy;
    private LocalDate date;
    private Double amount;
    private String importance;
}
