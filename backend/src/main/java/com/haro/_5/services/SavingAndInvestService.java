package com.haro._5.services;

import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.dtos.savingAndInvestDTO.CreateISDTO;
import com.haro._5.dtos.savingAndInvestDTO.SIInfoDTO;
import com.haro._5.dtos.savingAndInvestDTO.UpdateISDTO;
import com.haro._5.exceptions.NotFoundException;
import com.haro._5.mappers.SavingAndInvestMapper;
import com.haro._5.models.SIUpdate;
import com.haro._5.models.SavingAndInvest;
import com.haro._5.repositories.SavingAndInvestmentRepo;
import com.haro._5.repositories.WalletRepo;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SavingAndInvestService {

    @Autowired
    private final WalletRepo walletRepo;

    @Autowired
    private WalletService walletService;

    @Autowired
    private final SavingAndInvestmentRepo repo;

    @Autowired
    private SavingAndInvestMapper sniMapper;

    @Autowired
    private ResponseBuilder responseBuilder;

    public ApiResponse<List<SIInfoDTO>> getAllSnI() {
        List<SIInfoDTO> SnI = repo.findAll()
                .stream()
                .map(sniMapper::toDto)
                .toList();
        return new ApiResponse<>(200, "Fetching data successfully!", SnI);
    }

    public ResponseEntity<?> getSnIById(String id) {
        SavingAndInvest savingAndInvest = repo.findById(id)
                .orElseThrow(() -> new NotFoundException(id + "Not found"));
        SIInfoDTO dto = sniMapper.toDto(savingAndInvest);
        return responseBuilder.success(dto, "Fetching data successfully!");
    }

    public ResponseEntity<?> createSnI(@NotNull CreateISDTO request) {

        SavingAndInvest savingAndInvest = SavingAndInvest.builder()
                .title(request.getTitle())
                .initial(request.getInitial())
                .totalAmount(request.getInitial())
                .updates(request.getUpdates())
                .build();
        repo.save(savingAndInvest);

        SIInfoDTO dto = sniMapper.toDto(savingAndInvest);
        return responseBuilder.created(dto, "Created successfully!");
    }

    public ResponseEntity<?> addUpdate(String id, UpdateISDTO request) {
        SavingAndInvest savingAndInvest = repo.findById(id)
                .orElseThrow(() -> new NotFoundException(id + " Not found"));
        if (walletRepo.findByWalletId(request.getWalletId()).isEmpty()) {
            throw new NotFoundException("Wallet Id not found " + request.getWalletId());
        }

        SIUpdate update = SIUpdate.builder()
                .date(request.getDate())
                .amount(request.getAmount())
                .walletId(request.getWalletId())
                .fee(request.getFee())
                .type(request.getType())
                .build();

        Boolean typeOfTransaction = update.getType();


        Long updateRemain = typeOfTransaction ? update.getAmount() : -update.getAmount();
        Long updateValue = savingAndInvest.getTotalAmount() + updateRemain;

        walletService.updateWalletBalance(
                update.getWalletId(),
                update.getAmount() + update.getFee(),
                !typeOfTransaction
        );

        savingAndInvest.setTotalAmount(updateValue);
        savingAndInvest.getUpdates().add(update);
        repo.save(savingAndInvest);

        return responseBuilder.created(savingAndInvest, "Updated successfully");
    }

    public ApiResponse<String> deleteSI(String id) {
        SavingAndInvest savingAndInvest = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Saving and investment id not found: " + id));

        for (SIUpdate update : savingAndInvest.getUpdates()) {
            walletService.updateWalletBalance(
                    update.getWalletId(),
                    update.getAmount() + update.getFee(),
                    !update.getType()
            );
        }
        repo.deleteById(id);
        return new ApiResponse<>(200, "Deleted successfully!", id);
    }

}
