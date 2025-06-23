package com.haro._5.services;

import com.haro._5.dtos.TransactionDTO.TransactionInfoDTO;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.dtos.savingAndInvestDTO.CreateISDTO;
import com.haro._5.dtos.savingAndInvestDTO.SIInfoDTO;
import com.haro._5.dtos.savingAndInvestDTO.UpdateISDTO;
import com.haro._5.exceptions.NotFoundException;
import com.haro._5.mappers.SavingAndInvestMapper;
import com.haro._5.models.SavingAndInvest;
import com.haro._5.models.Transaction;
import com.haro._5.repositories.SavingAndInvestRecordRepo;
import com.haro._5.repositories.SavingAndInvestmentRepo;
import com.haro._5.repositories.WalletRepo;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.mapstruct.ap.internal.model.assignment.StreamAdderWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SavingAndInvestService {


    @Autowired
    private final SavingAndInvestmentRepo repo;


    @Autowired
    private SavingAndInvestMapper sniMapper;

    @Autowired
    private ResponseBuilder responseBuilder;

    //    Get all
    public ApiResponse<List<SIInfoDTO>> getAllSnI() {
        List<SIInfoDTO> SnI = repo.findAll()
                .stream()
                .map(sniMapper::toDto)
                .toList();
        return new ApiResponse<>(200, "Fetching data successfully!", SnI);
    }

    //    Get service
    public ResponseEntity<?> getSnIById(String id) {
        SavingAndInvest savingAndInvest = repo.findById(id)
                .orElseThrow(() -> new NotFoundException(id + "Not found"));
        SIInfoDTO dto = sniMapper.toDto(savingAndInvest);
        return responseBuilder.success(dto, "Fetching data successfully!");
    }

    //    Create service
    public ResponseEntity<?> createSnI(@NotNull CreateISDTO request) {

        SavingAndInvest savingAndInvest = SavingAndInvest.builder()
                .title(request.getTitle())
                .initial(request.getInitial())
                .type(request.getType())
                .active(true)
                .totalAmount(request.getInitial())
                .build();
        repo.save(savingAndInvest);

        SIInfoDTO dto = sniMapper.toDto(savingAndInvest);
        return responseBuilder.created(dto, "Created successfully!");
    }

    //    Update service
    public ResponseEntity<?> updateSnI(String id, UpdateISDTO request) {
        SavingAndInvest sni = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Transaction not found with Id:" + id));
        sniMapper.update(request, sni);

        SavingAndInvest updateSavingAndInvest = repo.save(sni);

        SIInfoDTO dto = sniMapper.toDto(updateSavingAndInvest);
        return responseBuilder.success(dto, "Transaction updated successfully!");
    }

    public ApiResponse<String> deleteSavingAndInvest(String id) {
        SavingAndInvest savingAndInvest = repo.findById(id)
                .orElseThrow(() -> new NotFoundException(id + "Not found"));
        repo.deleteById(id);
        return new ApiResponse<>(200, "Deleted successfully!", id);
    }

    public void updateSavingInvestBalance(String id, double amount, Boolean type) {
        SavingAndInvest savingAndInvest = repo.findById(id)
                .orElseThrow(() -> new NotFoundException(id + " not found ind saving and investment"));

        Double initialBalance = savingAndInvest.getTotalAmount();
        double updateValue = type ? initialBalance + amount : initialBalance - amount;

        savingAndInvest.setTotalAmount(updateValue);

        repo.save(savingAndInvest);
    }

}
