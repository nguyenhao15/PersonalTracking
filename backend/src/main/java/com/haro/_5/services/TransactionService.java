package com.haro._5.services;

import com.haro._5.dtos.TransactionDTO.CreateTransactionDTO;
import com.haro._5.dtos.TransactionDTO.TransactionInfoDTO;
import com.haro._5.dtos.TransactionDTO.UpdateTransactionRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.exceptions.NotFoundException;
import com.haro._5.mappers.TransactionMapper;
import com.haro._5.models.Transaction;
import com.haro._5.repositories.CategoryRepo;
import com.haro._5.repositories.TransactionRepo;
import com.haro._5.repositories.WalletRepo;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private TransactionMapper transactionMapper;

    @Autowired
    private ResponseBuilder responseBuilder;

    @Autowired
    private WalletRepo walletRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private WalletService walletService;

    public ApiResponse<List<TransactionInfoDTO>> getAllTransactions(String username, Boolean type) {
        List<TransactionInfoDTO> transaction = transactionRepo.findByCreatedByAndType(username,type)
                .stream()
                .map(transactionMapper::toDto)
                .toList();
        return new ApiResponse<>(200, "Fetching transactions successfully", transaction);
    }

    public ResponseEntity<?> getTransactionById(String id) {
        Transaction transaction = transactionRepo.findById(id).orElseThrow(() -> new NotFoundException(id + "Not found"));
        TransactionInfoDTO dto = transactionMapper.toDto(transaction);
        return responseBuilder.success(dto, "Transaction found successfully!");
    }

    public ResponseEntity<?> createTransaction(CreateTransactionDTO createTransactionDTO) {
        if (walletRepo.findByWalletId(createTransactionDTO.getWalletId()).isEmpty()) {
            throw new NotFoundException("WalletId not found");
        }

        if (categoryRepo.findById(createTransactionDTO.getCategory()).isEmpty()) {
            throw new NotFoundException("CategoryId not found");
        }


        Transaction transaction = Transaction.builder()
                .expensesName(createTransactionDTO.getExpensesName())
                .walletId(createTransactionDTO.getWalletId())
                .type(createTransactionDTO.getType())
                .amount(createTransactionDTO.getAmount())
                .category(createTransactionDTO.getCategory())
                .importance(createTransactionDTO.getImportance())
                .date(createTransactionDTO.getDate())
                .build();

        transactionRepo.save(transaction);

        walletService.updateWalletBalance(
                transaction.getWalletId(),
                transaction.getAmount(),
                transaction.getType()
        );
        TransactionInfoDTO dto = transactionMapper.toDto(transaction);
        return responseBuilder.created(dto, "Transaction created successfully!");
    }

    public ResponseEntity<?> updateTransaction(String id, UpdateTransactionRequest request) {
        Transaction transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Transaction not found with Id:" + id));
        

        String oldWalletId = transaction.getWalletId();
        double oldAmount = transaction.getAmount();
        boolean oldType = transaction.getType();

        transactionMapper.update(request, transaction);


        Transaction updatedTransaction = transactionRepo.save(transaction);

        walletService.updateWalletBalance(oldWalletId, oldAmount, !oldType);
        walletService.updateWalletBalance(
                updatedTransaction.getWalletId(),
                updatedTransaction.getAmount(),
                updatedTransaction.getType()
        );

        TransactionInfoDTO dto = transactionMapper.toDto(updatedTransaction);
        return responseBuilder.success(dto, "Transaction updated successfully!");
    }

    public ApiResponse<String> deleteTransaction(String id) {
        Transaction transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Transaction not found with ID: " + id));
        walletService.updateWalletBalance(transaction.getWalletId(), transaction.getAmount(), !transaction.getType());
        transactionRepo.deleteById(id);
        return new ApiResponse<>(200, "Transaction deleted successfully!", id);
    }


}
