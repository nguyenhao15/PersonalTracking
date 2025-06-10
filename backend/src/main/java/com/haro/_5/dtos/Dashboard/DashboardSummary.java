package com.haro._5.dtos.Dashboard;

import com.haro._5.dtos.TransactionDTO.GetTotalValueByCategoryDTO;
import com.haro._5.dtos.TransactionDTO.TransactionInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class DashboardSummary {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal totalBalance;
    private List<TransactionInfoDTO> thisMonthExpenses;
    private List<TransactionInfoDTO> lastThirtyDaysExpenses;
    private List<TransactionInfoDTO> thisMonthIncome;
    private List<TransactionInfoDTO> lastSixtyDaysIncome;
    private List<GetTotalValueByCategoryDTO> topFiveCategory;
}
