package com.haro._5.controllers;

import com.haro._5.dtos.TransactionDTO.CreateTransactionDTO;
import com.haro._5.dtos.TransactionDTO.TransactionInfoDTO;
import com.haro._5.dtos.TransactionDTO.UpdateTransactionRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.services.TransactionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/income")
    public ResponseEntity<ApiResponse<List<TransactionInfoDTO>>> getAllIncomes(
            @AuthenticationPrincipal UserDetails user
            ) {
        return ResponseEntity.ok(transactionService.getAllTransactions(user.getUsername(),true));
    }

    @GetMapping("/expenses")
    public ResponseEntity<ApiResponse<List<TransactionInfoDTO>>> getAllExpenses(
            @AuthenticationPrincipal UserDetails user
    ) {
        return ResponseEntity.ok(transactionService.getAllTransactions(user.getUsername(),false));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTransactionById(@PathVariable String id) {
        return transactionService.getTransactionById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTransaction(@Valid @RequestBody CreateTransactionDTO createTransactionDTO) {
        return ResponseEntity.ok(transactionService.createTransaction(createTransactionDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateTransaction(@PathVariable String id,@Valid @RequestBody UpdateTransactionRequest request) {
        return transactionService.updateTransaction(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTransaction(@PathVariable String id) {
        return ResponseEntity.ok(transactionService.deleteTransaction(id));
    }


}
