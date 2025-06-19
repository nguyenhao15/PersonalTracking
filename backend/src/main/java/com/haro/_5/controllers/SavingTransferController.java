package com.haro._5.controllers;

import com.haro._5.dtos.SavingTransferDTO.CreateTransferSIR;
import com.haro._5.dtos.SavingTransferDTO.SavingTransferInfo;
import com.haro._5.dtos.SavingTransferDTO.UpdateSavingTransferDTO;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.services.SavingTransferService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sni/update")
public class SavingTransferController {


    @Autowired
    private SavingTransferService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SavingTransferInfo>>> getAllItem() {
        return ResponseEntity.ok(service.getAllSavingTransferRecord());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSavingTransferById(@PathVariable String id) {
        return service.getSavingTransferById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNewSavingTransfer(@Valid @RequestBody CreateTransferSIR request) {
        System.out.println(request);
        return ResponseEntity.ok(service.createNewSavingTransfer(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable String id, @RequestBody UpdateSavingTransferDTO request) {
        return service.updateSavingTransferItem(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteSavingTransferItem(@PathVariable String id) {
        return ResponseEntity.ok(service.deleteSavingTransfer(id));
    }

}
