package com.haro._5.dtos.TransactionDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class GetTotalValueByCategoryDTO {
    private String categoryId;
    private BigDecimal totalValue;
}
