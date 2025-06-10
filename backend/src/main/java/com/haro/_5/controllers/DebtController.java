package com.haro._5.controllers;

import com.haro._5.dtos.DebtDTO.CreateDebtDTO;
import com.haro._5.dtos.DebtDTO.DebtInfoDTO;
import com.haro._5.dtos.DebtDTO.UpdateDebtRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.services.DebtService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/debts")
public class DebtController {

    private final DebtService debtService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<DebtInfoDTO>>> getAllDebts() {
        return ResponseEntity.ok(debtService.getAllDebts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDebtById(@PathVariable String id) {
        return debtService.getDebtById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createDebt(@Valid @RequestBody CreateDebtDTO createDebtDTO) {
        return ResponseEntity.ok((debtService.createDebt(createDebtDTO)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateDebt(@PathVariable String id, @RequestBody UpdateDebtRequest request) {
        return debtService.addUpdate(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDebt(@PathVariable String id) {
        return ResponseEntity.ok((debtService.deleteDebt(id)));
    }
}
