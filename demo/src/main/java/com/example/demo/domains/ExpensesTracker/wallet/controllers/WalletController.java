package com.example.demo.domains.ExpensesTracker.wallet.controllers;

import com.example.demo.core.annotation.InstanceApiController;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletInfoDto;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletRequestDto;
import com.example.demo.domains.ExpensesTracker.wallet.dto.wallet.WalletSummaryInfo;
import com.example.demo.domains.ExpensesTracker.wallet.services.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@InstanceApiController
@RequestMapping("/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping
    public ResponseEntity<?> createNewWallet(@RequestBody WalletRequestDto walletRequestDto) {
        WalletInfoDto walletInfoDto = walletService.createWallet(walletRequestDto);
        return ResponseEntity.ok(walletInfoDto);
    }

    @GetMapping("/{walletId}")
    public ResponseEntity<?> getWalletInfo(@PathVariable Long walletId) {
        WalletInfoDto walletInfoDto = walletService.getWalletInfo(walletId);
        return ResponseEntity.ok(walletInfoDto);
    }

    @GetMapping("/get/my-wallets")
    public ResponseEntity<?> getMyWallets() {
        List<WalletSummaryInfo> walletList = walletService.getMyAllWallets();
        return ResponseEntity.ok(walletList);
    }

    @PatchMapping("/{walletId}/update-balance")
    public ResponseEntity<?> updateWalletBalance(@PathVariable Long walletId, @RequestParam Long amount) {
        WalletInfoDto walletInfoDto = walletService.updateWalletBalance(walletId, amount);
        return ResponseEntity.ok(walletInfoDto);
    }

    @PatchMapping("/{walletId}")
    public ResponseEntity<?> updateWallet(@PathVariable Long walletId, @RequestBody WalletRequestDto walletRequestDto) {
        WalletInfoDto walletInfoDto = walletService.updateWallet(walletId, walletRequestDto);
        return ResponseEntity.ok(walletInfoDto);
    }

}
