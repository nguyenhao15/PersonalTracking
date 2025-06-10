package com.haro._5.dtos.TransferDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = false)
public class CreateTransferDTO {


    @NotBlank(message = "Source WalletId is required")
    private String sourceWalletId;

    @NotBlank(message = "Destination WalletId is required")
    private String destinationWalletId;

    @Min(value = 1, message = "amount must be greater than 1")
    @NotNull
    private Double amount;

    @Builder.Default
    private Double transferFee = 0.0;

    @NotNull
    private LocalDate date;

    private String createdBy;

    private String note;


}
