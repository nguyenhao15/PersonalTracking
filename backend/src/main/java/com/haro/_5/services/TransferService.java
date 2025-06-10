package com.haro._5.services;

import com.haro._5.dtos.TransferDTO.CreateTransferDTO;
import com.haro._5.dtos.TransferDTO.TransferInfoDTO;
import com.haro._5.dtos.TransferDTO.UpdateTransferRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.exceptions.NotFoundException;
import com.haro._5.mappers.TransferMapper;
import com.haro._5.models.Transfer;
import com.haro._5.repositories.TransferRepo;
import com.haro._5.repositories.WalletRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TransferService {

    @Autowired
    private TransferRepo transferRepo;

    @Autowired
    private TransferMapper transferMapper;

    @Autowired
    private WalletRepo walletRepo;

    @Autowired
    private WalletService walletService;

    @Autowired
    private ResponseBuilder responseBuilder;

    public ApiResponse<List<TransferInfoDTO>> getAllTransfers() {
        List<TransferInfoDTO> transfer = transferRepo.findAll()
                .stream()
                .map(transferMapper::toDto)
                .toList();
        return new ApiResponse<>(200, "Fetching transfer successfully!", transfer);
    }

    public ResponseEntity<?> getTransferById(String id) {
        Transfer transfer = transferRepo.findById(id).orElseThrow(() -> new NotFoundException("Transfer id not found: " + id));
        TransferInfoDTO dto = transferMapper.toDto(transfer);
        return responseBuilder.success(dto, "Get transfer by id Successfully!");
    }

    public ResponseEntity<?> createTransfer(CreateTransferDTO createTransferDTO) {
        if (
                walletRepo.findByWalletId(createTransferDTO.getDestinationWalletId()).isEmpty() ||
                        walletRepo.findByWalletId(createTransferDTO.getSourceWalletId()).isEmpty()
        ) {
            throw new NotFoundException("SourceWalletId or DestinationWalletId not found");
        }
        Transfer transfer = Transfer.builder()
                .sourceWalletId(createTransferDTO.getSourceWalletId())
                .amount(createTransferDTO.getAmount())
                .destinationWalletId(createTransferDTO.getDestinationWalletId())
                .transferFee(createTransferDTO.getTransferFee())
                .note(createTransferDTO.getNote())
                .date(createTransferDTO.getDate())
                .build();
        transferRepo.save(transfer);
        walletService.updateWalletBalance(
                transfer.getSourceWalletId(),
                (transfer.getAmount() + transfer.getTransferFee()),
                false
        );
        walletService.updateWalletBalance(
                transfer.getDestinationWalletId(),
                transfer.getAmount(),
                true
        );
        TransferInfoDTO dto = transferMapper.toDto(transfer);
        return responseBuilder.created(dto, "Transfer created successfully!");
    }

    public ResponseEntity<?> updateTransfer(String id, UpdateTransferRequest request) {
        Transfer transfer = transferRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Transfer not found with Id: " + id));

        String oldSourceWalletId = transfer.getSourceWalletId();
        String oldDestinationWalletId = transfer.getDestinationWalletId();
        double oldAmount = transfer.getAmount();
        double oldFee = transfer.getTransferFee();

        transferMapper.update(request, transfer);

        Transfer updateTransfer = transferRepo.save(transfer);

        walletService.updateWalletBalance(oldSourceWalletId, (oldAmount + oldFee), true);
        walletService.updateWalletBalance(oldDestinationWalletId, oldAmount, false);

        walletService.updateWalletBalance(
                updateTransfer.getSourceWalletId(),
                (updateTransfer.getAmount() + updateTransfer.getTransferFee()),
                false
        );
        walletService.updateWalletBalance(
                updateTransfer.getDestinationWalletId(),
                updateTransfer.getAmount(),
                true
        );

        TransferInfoDTO dto = transferMapper.toDto(updateTransfer);
        return responseBuilder.success(dto, "Transfer updated successfully!");

    }

    public ApiResponse<String> deleteTransfer(String id) {
        Transfer transfer = transferRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Transfer not found with Id: " + id));
        walletService.updateWalletBalance(transfer.getSourceWalletId(), (transfer.getAmount() + transfer.getTransferFee()), true);
        walletService.updateWalletBalance(transfer.getDestinationWalletId(), transfer.getAmount(), false);
        transferRepo.deleteById(id);
        return new ApiResponse<>(200, "Transfer deleted successfully!", id);
    }

}
