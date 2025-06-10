package com.haro._5.dtos.TransactionDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = false)
public class CreateTransactionDTO {

    @NotBlank(message = "expensesName is required")
    private String expensesName;

    @NotBlank(message = "walletId is required")
    private String walletId;

    @NotNull(message = "type is required")
    private Boolean type;

    @Min(value = 1, message = "amount must be positive")
    private Double amount;

    @NotBlank(message = "category is required")
    private String category;

    private String importance;

    private String createdBy;

    @NotNull(message = "date is required")
    private LocalDate date;

}
