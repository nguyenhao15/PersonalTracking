package com.haro._5.models;

import lombok.AllArgsConstructor;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "debts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Debt {

    @Id
    private String _id;

    private LocalDate date;
    private Long amount;
    private String content;
    private String walletId;
    private Long remain;

    private Boolean type;


    @Builder.Default
    private List<DebtUpdate> updates = new ArrayList<>();

    @CreatedBy
    private String createdBy;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

}
