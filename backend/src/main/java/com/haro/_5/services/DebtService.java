package com.haro._5.services;

import com.haro._5.dtos.DebtDTO.CreateDebtDTO;
import com.haro._5.dtos.DebtDTO.DebtInfoDTO;
import com.haro._5.dtos.DebtDTO.UpdateDebtRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.exceptions.NotFoundException;
import com.haro._5.mappers.DebtMapper;
import com.haro._5.models.Debt;
import com.haro._5.models.DebtUpdate;
import com.haro._5.repositories.DebtRepo;
import com.haro._5.repositories.WalletRepo;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class DebtService {

    @Autowired
    private final WalletRepo walletRepo;

    @Autowired
    private WalletService walletService;

    @Autowired
    private final DebtRepo repo;

    @Autowired
    private DebtMapper debtMapper;

    @Autowired
    private ResponseBuilder responseBuilder;

    public ApiResponse<List<DebtInfoDTO>> getAllDebts() {
        List<DebtInfoDTO> debt = repo.findAll()
                .stream()
                .map(debtMapper::toDto)
                .toList();
        return new ApiResponse<>(200, "Fetching debt successfully!", debt);
    }

    public ResponseEntity<?> getDebtById(String id) {
        Debt debt = repo.findById(id).orElseThrow(() -> new NotFoundException(id + " Not found"));
        DebtInfoDTO dto = debtMapper.toDto(debt);
        return responseBuilder.success(dto, "Successfully!");
    }

    public ResponseEntity<?> createDebt(@NotNull CreateDebtDTO request) {

        if (walletRepo.findByWalletId(request.getWalletId()).isEmpty()) {
            throw new NotFoundException("WalletId not found");
        }

        Debt debt = Debt.builder()
                .amount(request.getAmount())
                .date(request.getDate())
                .type(request.getType())
                .remain(request.getAmount())
                .walletId(request.getWalletId())
                .build();
        repo.save(debt);
        walletService.updateWalletBalance(
                debt.getWalletId(),
                debt.getAmount(),
                debt.getType()
        );
        DebtInfoDTO dto = debtMapper.toDto(debt);
        return responseBuilder.created(dto, "Debt created successfully!");
    }

    public ResponseEntity<?> addUpdate(String debtId, @NotNull UpdateDebtRequest request) {
        Debt debt = repo.findById(debtId)
                .orElseThrow(() -> new NotFoundException("DebtId not found with " + debtId));

        if (walletRepo.findByWalletId(request.getWalletId()).isEmpty()) {
            throw new NotFoundException("WalletId not found "+request.getWalletId() );
        }

        Boolean typeOfDebt = !debt.getType();
        DebtUpdate update = DebtUpdate.builder()
                .amount(request.getAmount())
                .date(request.getDate())
                .walletId(request.getWalletId())
                .build();


        Long currentRemain = debt.getRemain() != null ? debt.getRemain() : 0L;
        Long updateRemain = currentRemain - update.getAmount();

        if (updateRemain < 0) {
            throw new IllegalArgumentException("Số tiền vượt quá khoản nợ.");
        }

        debt.setRemain(updateRemain);
        debt.getUpdates().add(update);

        walletService.updateWalletBalance(
                update.getWalletId(),
                update.getAmount(),
                typeOfDebt
        );
        repo.save(debt);

        return responseBuilder.created(debt, "Updated successfully!");
    }

    public ApiResponse<String> deleteDebt(String id) {
        Debt debt = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Debt not found with id: " + id));

        Boolean typeOfDebt = debt.getType();
        for (DebtUpdate update : debt.getUpdates()) {
            walletService.updateWalletBalance(
                    update.getWalletId(),
                    update.getAmount(),
                    !typeOfDebt
            );
        }

        walletService.updateWalletBalance(debt.getWalletId(), debt.getRemain(), !typeOfDebt);
        repo.deleteById(id);
        return new ApiResponse<>(200, "Deleted successfully!", id);
    }

}
