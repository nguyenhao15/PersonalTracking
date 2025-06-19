package com.haro._5.services;


import com.haro._5.dtos.Dashboard.DashboardSummary;
import com.haro._5.dtos.TransactionDTO.GetTotalValueByCategoryDTO;
import com.haro._5.dtos.TransactionDTO.TransactionInfoDTO;
import com.haro._5.models.Transaction;
import com.haro._5.models.Wallet;
import com.haro._5.repositories.DashboardService;
import com.haro._5.repositories.TransactionRepo;
import com.haro._5.repositories.WalletRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private WalletRepo walletRepo;

    @Override
    public DashboardSummary getSummaryForUser(String userId) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfMonth = today.withDayOfMonth(1).atStartOfDay().minusDays(1);
        LocalDateTime endOfMonth = today.withDayOfMonth(today.lengthOfMonth()).atTime(LocalTime.MAX);

        List<Transaction> incomeTransactions = transactionRepo.findByCreatedByAndType(userId, true);
        List<Transaction> expensesTransactions = transactionRepo.findByCreatedByAndType(userId, false);
        List<Transaction> thisMonthExpense = transactionRepo.findByCreatedByAndDateBetweenAndType(userId, startOfMonth, endOfMonth, false);
        List<Transaction> thisMonthIncome = transactionRepo.findByCreatedByAndDateBetweenAndType(userId, startOfMonth, endOfMonth, true);
        List<Transaction> lastThirtyDayAgoExpenses = transactionRepo.findByCreatedByAndDateBetweenAndType(userId, today.minusDays(29).atStartOfDay(), today.atTime(LocalTime.MAX), false);
        List<Transaction> lastSixtyDayAgoIncome = transactionRepo.findByCreatedByAndDateBetweenAndType(userId, today.minusDays(59).atStartOfDay(), today.atTime(LocalTime.MAX), true);
        List<Wallet> wallet = walletRepo.findByCreatedBy(userId);

        BigDecimal totalIncome = incomeTransactions.stream()
                .map(t -> BigDecimal.valueOf(t.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpenses = expensesTransactions.stream()
                .map(t -> BigDecimal.valueOf(t.getAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalBalance = wallet.stream()
                .map(t -> BigDecimal.valueOf(t.getBalance()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        List<TransactionInfoDTO> thisMonthExpenses = thisMonthExpense
                .stream()
                .map(t -> new TransactionInfoDTO(
                        t.get_id(),
                        t.getExpensesName(),
                        t.getWalletId(),
                        t.getType(),
                        t.getCategory(),
                        t.getCreatedBy(),
                        t.getDate(),
                        t.getAmount(),
                        t.getImportance()
                ))
                .toList();

        List<TransactionInfoDTO> lastThirtyDaysAgoExpenses = lastThirtyDayAgoExpenses
                .stream()
                .map(t -> new TransactionInfoDTO(
                        t.get_id(),
                        t.getExpensesName(),
                        t.getWalletId(),
                        t.getType(),
                        t.getCategory(),
                        t.getCreatedBy(),
                        t.getDate(),
                        t.getAmount(),
                        t.getImportance()
                ))
                .toList();

        List<TransactionInfoDTO> thisMonthIncomeDTO = thisMonthIncome
                .stream()
                .map(t -> new TransactionInfoDTO(
                        t.get_id(),
                        t.getExpensesName(),
                        t.getWalletId(),
                        t.getType(),
                        t.getCategory(),
                        t.getCreatedBy(),
                        t.getDate(),
                        t.getAmount(),
                        t.getImportance()
                ))
                .toList();

        List<TransactionInfoDTO> lastThirtyDaysAgoIncomeDTO = lastSixtyDayAgoIncome
                .stream()
                .map(t -> new TransactionInfoDTO(
                        t.get_id(),
                        t.getExpensesName(),
                        t.getWalletId(),
                        t.getType(),
                        t.getCategory(),
                        t.getCreatedBy(),
                        t.getDate(),
                        t.getAmount(),
                        t.getImportance()
                ))
                .toList();

        Map<String, BigDecimal> expensesByCategory = thisMonthExpense.stream()

                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                t -> BigDecimal.valueOf(t.getAmount()),
                                BigDecimal::add
                        )
                ));
        List<GetTotalValueByCategoryDTO> topExpenseCategories = expensesByCategory.entrySet().stream()
                .map(e -> new GetTotalValueByCategoryDTO(e.getKey(), e.getValue()))
                .sorted(Comparator.comparing(GetTotalValueByCategoryDTO::getTotalValue).reversed())
                .limit(5)
                .toList();

        return new DashboardSummary(totalIncome, totalExpenses, totalBalance, thisMonthExpenses, lastThirtyDaysAgoExpenses, thisMonthIncomeDTO, lastThirtyDaysAgoIncomeDTO, topExpenseCategories);
    }
}
