package com.haro._5.services;


import com.haro._5.dtos.SavingTransferDTO.CreateTransferSIR;
import com.haro._5.dtos.SavingTransferDTO.SavingTransferInfo;
import com.haro._5.dtos.SavingTransferDTO.UpdateSavingTransferDTO;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.exceptions.NotFoundException;
import com.haro._5.mappers.TransferSavingMapper;
import com.haro._5.models.SIRecord;
import com.haro._5.repositories.SavingAndInvestRecordRepo;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SavingTransferService {

    @Autowired
    private SavingAndInvestRecordRepo repo;

    @Autowired
    private TransferSavingMapper mapper;

    @Autowired
    private SavingAndInvestService savingAndInvestService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private ResponseBuilder responseBuilder;

    public ApiResponse<List<SavingTransferInfo>> getAllSavingTransferRecord() {
        List<SavingTransferInfo> SnIRecord = repo.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
        return new ApiResponse<>(200, "Fetching data successfully!", SnIRecord);
    }

    public ResponseEntity<?> getSavingTransferById(String id) {
        SIRecord findItem = repo.findById(id)
                .orElseThrow(() -> new NotFoundException(id + " Not found"));
        SavingTransferInfo dto = mapper.toDto(findItem);
        return responseBuilder.success(dto, "Fetching data successfully!");
    }

    public ResponseEntity<?> createNewSavingTransfer(@NotNull CreateTransferSIR request) {

        SIRecord createItem = SIRecord.builder()
                .parentId(request.getParentId())
                .date(request.getDate())
                .type(request.getType())
                .amount(request.getAmount())
                .walletId(request.getWalletId())
                .fee(request.getFee())
                .build();

        repo.save(createItem);

        double updateBalanceAmount = createItem.getType() ? createItem.getAmount() : createItem.getAmount() + createItem.getFee();
        double updateSavingBalance = !createItem.getType() ? createItem.getAmount() : createItem.getAmount() - createItem.getFee();

        walletService.updateWalletBalance(createItem.getWalletId(), updateBalanceAmount, !createItem.getType());
        savingAndInvestService.updateSavingInvestBalance(createItem.getParentId(), updateSavingBalance, createItem.getType());

        SavingTransferInfo dto = mapper.toDto(createItem);
        return responseBuilder.created(dto, "Created successfully!");
    }

    public ResponseEntity<?> updateSavingTransferItem(String id, UpdateSavingTransferDTO request) {
        SIRecord siRecord = repo.findById(id)
                .orElseThrow(() -> new NotFoundException(id + " Not found"));
        mapper.update(request, siRecord);

        double updateBalanceAmount = siRecord.getType() ? siRecord.getAmount() : siRecord.getAmount() + siRecord.getFee();
        double updateSavingBalance = siRecord.getType() ? siRecord.getAmount() - siRecord.getFee() : siRecord.getAmount();

        walletService.updateWalletBalance(siRecord.getWalletId(), updateBalanceAmount, siRecord.getType());
        savingAndInvestService.updateSavingInvestBalance(siRecord.getParentId(), updateSavingBalance, !siRecord.getType());

        SIRecord updateSIRecord = repo.save(siRecord);

        walletService.updateWalletBalance(updateSIRecord.getWalletId(), updateBalanceAmount, !updateSIRecord.getType());
        savingAndInvestService.updateSavingInvestBalance(updateSIRecord.getParentId(), updateSavingBalance, updateSIRecord.getType());

        SavingTransferInfo dto = mapper.toDto(updateSIRecord);
        return responseBuilder.success(dto, "Update item successfully!");
    }

    public ApiResponse<String> deleteSavingTransfer(String id) {
        SIRecord deleteItem = repo.findById(id)
                .orElseThrow(() -> new NotFoundException(id + " Not found"));

        double updateBalanceAmount = deleteItem.getType() ? deleteItem.getAmount() : deleteItem.getAmount() + deleteItem.getFee();
        double updateSavingBalance = deleteItem.getType() ? deleteItem.getAmount() - deleteItem.getFee() : deleteItem.getAmount();
        walletService.updateWalletBalance(deleteItem.getWalletId(), updateBalanceAmount, deleteItem.getType());
        savingAndInvestService.updateSavingInvestBalance(deleteItem.getParentId(), updateSavingBalance, !deleteItem.getType());

        repo.deleteById(id);
        return new ApiResponse<>(200, "Deleted successfully!", id);
    }

}
