package com.haro._5.dtos.TransferSavingDTO;

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

    private String savingAndInvestId;
    private LocalDate sendingDate;

    private Boolean type;
    //    Sending || throwing

    private Double amount;
    private String walletId;
    private Double fee;

}
