package com.haro._5.controllers;


import com.haro._5.dtos.DebtDTO.CreateDebtDTO;
import com.haro._5.dtos.DebtDTO.DebtInfoDTO;
import com.haro._5.dtos.DebtDTO.UpdateDebtRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.savingAndInvestDTO.CreateISDTO;
import com.haro._5.dtos.savingAndInvestDTO.SIInfoDTO;
import com.haro._5.dtos.savingAndInvestDTO.UpdateISDTO;
import com.haro._5.services.SavingAndInvestService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/sni")
public class SavingAndInvestmentController {

    private final SavingAndInvestService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SIInfoDTO>>> getAllSavingsandInvestments() {
        return ResponseEntity.ok(service.getAllSnI());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDebtById(@PathVariable String id) {
        return service.getSnIById(id);
    }


    @PostMapping("/create")
    public ResponseEntity<?> createDebt(@Valid @RequestBody CreateISDTO request) {
        return ResponseEntity.ok((service.createSnI(request)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateDebt(@PathVariable String id, @RequestBody UpdateISDTO request) {
        return service.addUpdate(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDebt(@PathVariable String id) {
        return ResponseEntity.ok((service.deleteSI(id)));
    }


}
