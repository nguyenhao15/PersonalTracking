package com.haro._5.dtos.DebtDTO;

import com.haro._5.models.DebtUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;


import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class DebtInfoDTO {

    private String _id;

    private LocalDate date;
    private Long amount;
    private String walletId;
    private String content;
    private Boolean type;
    private Long remain;

    private String createdBy;

    private List<DebtUpdate> updates;
}
