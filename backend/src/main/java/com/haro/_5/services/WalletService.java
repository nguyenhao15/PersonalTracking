package com.haro._5.services;

import com.haro._5.dtos.WalletDTO.CreateWallet;
import com.haro._5.dtos.WalletDTO.UpdateWalletRequest;
import com.haro._5.dtos.WalletDTO.WalletInfoDTO;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.exceptions.BadRequestException;
import com.haro._5.exceptions.NotFoundException;
import com.haro._5.mappers.WalletMapper;
import com.haro._5.models.Wallet;
import com.haro._5.repositories.WalletRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class WalletService {

    private final WalletRepo walletRepo;
    private final WalletMapper walletMapper;
    private final ResponseBuilder responseBuilder;

    public ApiResponse<List<WalletInfoDTO>> getAllWallets() {
        List<WalletInfoDTO> wallets = walletRepo.findAll()
                .stream()
                .map(walletMapper::toDto)
                .toList();
        return new ApiResponse<>(200, "Fetching wallets successfully", wallets);
    }

    public ResponseEntity<?> getWalletByWalletId(String id) {
        var wallet = walletRepo.findByWalletId(id).orElseThrow(() -> new NotFoundException(id + "Not found"));
        WalletInfoDTO dto = walletMapper.toDto(wallet);
        return responseBuilder.success(dto, "Wallet found successfully!");
    }

    public ResponseEntity<?> createWallet(CreateWallet createWallet) {
        if (walletRepo.findByWalletId(String.valueOf(createWallet.getWalletId())).isPresent()) {
            throw new BadRequestException("Wallet Id already exist");
        }

        Wallet wallet = Wallet.builder()
                .name(createWallet.getName())
                .walletId(createWallet.getWalletId())
                .type(createWallet.getType())
                .initial(createWallet.getInitial())
                .currency(createWallet.getCurrency())
                .balance(createWallet.getBalance())
                .build();
        walletRepo.save(wallet);
        WalletInfoDTO dto = walletMapper.toDto(wallet);
        return responseBuilder.created(dto, "Wallet created successfully!");
    }

    public ResponseEntity<?> updateWallet(String id, UpdateWalletRequest request) {
        Wallet wallet = walletRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Wallet not found with ID: " + id));
        walletMapper.update(request, wallet);
        walletRepo.save(wallet);

        WalletInfoDTO dto = walletMapper.toDto(wallet);
        return responseBuilder.success(dto, "Wallet update successfully!");
    }

    public ApiResponse<String> deleteWallet(String id) {
        Wallet wallet = walletRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Wallet not found with ID: " + id));
        walletRepo.deleteById(id);
        return new ApiResponse<>(200, "Wallet deleted successfully!", id);
    }

    public void updateWalletBalance(String walletId, double amount, Boolean type) {
        Wallet wallet = walletRepo.findByWalletId(walletId)
                .orElseThrow(() -> new NotFoundException("Wallet not found with ID: " + walletId));
        var balanceValue = wallet.getBalance();
        if (type) {
            wallet.setBalance(balanceValue + amount);
        } else {
            wallet.setBalance(balanceValue - amount);
        }

        walletRepo.save(wallet);
    }
}
