package com.haro._5.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDate;


@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Document(collection = "SIRecord")
public class SIRecord {
    //this is for update saving wallet
    @Id
    private String _id;

    private String parentId;

    private LocalDate date;

    //    Sending || throwing
    private Boolean type;

    private Double amount;
    private String walletId;
    private Double fee;

    @CreatedDate
    private Instant createdAt;
    @CreatedBy
    private String username;
}
