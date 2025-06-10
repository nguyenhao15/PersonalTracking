package com.haro._5.controllers;


import com.haro._5.dtos.WalletDTO.CreateWallet;
import com.haro._5.dtos.WalletDTO.UpdateWalletRequest;
import com.haro._5.dtos.WalletDTO.WalletInfoDTO;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.services.WalletService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/wallets")
public class WalletController {

    @Autowired
    private final WalletService walletService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<WalletInfoDTO>>> getAllWallets(){
        return ResponseEntity.ok(walletService.getAllWallets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getWalletByWalletId(@PathVariable String id) {
        return walletService.getWalletByWalletId(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createWallet(@Valid @RequestBody CreateWallet createWallet) {
        return ResponseEntity.ok(walletService.createWallet(createWallet));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateWallet(
            @PathVariable String id,
            @RequestBody UpdateWalletRequest request ){
    return walletService.updateWallet(id,request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteWallet(@PathVariable String id) {
        return ResponseEntity.ok(walletService.deleteWallet(id));
    }

}
