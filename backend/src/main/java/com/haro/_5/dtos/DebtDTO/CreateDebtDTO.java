package com.haro._5.dtos.DebtDTO;

import com.haro._5.models.DebtUpdate;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDebtDTO {

    @Id
    private String _id;

    @NotNull(message = "date is required")
    private LocalDate date;

    @NotNull(message = "amount is required")
    private Long amount;

    @NotNull(message = "walletId is required")
    private String walletId;

    private String content;

    @NotNull(message = "type is required")
    private Boolean type;

    private Long remain;

    private String createdBy;

    private List<DebtUpdate> updates;


}
