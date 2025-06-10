package com.haro._5.controllers;

import com.haro._5.dtos.TransferDTO.CreateTransferDTO;
import com.haro._5.dtos.TransferDTO.TransferInfoDTO;
import com.haro._5.dtos.TransferDTO.UpdateTransferRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.services.TransferService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/transfers")
public class TransferController {

    private final TransferService transferService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransferInfoDTO>>> getAllTransfer() {
        return ResponseEntity.ok(transferService.getAllTransfers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTransferById(@PathVariable String id) {
        return transferService.getTransferById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTransfer(@Valid @RequestBody CreateTransferDTO createTransferDTO) {
        return ResponseEntity.ok(transferService.createTransfer(createTransferDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateTransfer(@PathVariable String id, @Valid @RequestBody UpdateTransferRequest request) {
        return transferService.updateTransfer(id,request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTransfer(@PathVariable String id) {
        return ResponseEntity.ok(transferService.deleteTransfer(id));
    }


}
