package com.haro._5.dtos.savingAndInvestDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateISDTO {

    @Id
    private String _id = new ObjectId().toString();

    @NotBlank(message = "WalletId is required")
    private String walletId;

    @NotNull(message = "Amount is required")
    private Long amount;

    @Builder.Default
    private Long fee = 0L;

    @NotNull(message = "type is required")
//    Withdraw or sending
    private Boolean type;

    @NotNull(message = "date is required")
    private LocalDate date;

}
