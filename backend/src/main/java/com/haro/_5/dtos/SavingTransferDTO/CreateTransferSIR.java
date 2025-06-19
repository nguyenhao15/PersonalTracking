package com.haro._5.dtos.SavingTransferDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;


@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class CreateTransferSIR {

    @Id
    private String _id;

    @NotBlank(message = "parentId is required ")
    private String parentId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "walletId is required")
    private String walletId;

    @NotNull(message = "type is required")
    private Boolean type;
    //    Sending || throwing

    @NotNull(message = "amount is required")
    private Double amount;

    @Builder.Default
    private Double fee = 0.0;

}
