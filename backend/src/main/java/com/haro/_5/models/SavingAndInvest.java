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
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "savingsAndInvestment")
@Builder
public class SavingAndInvest {

    @Id
    private String _id;

    private String title;
    private Double totalAmount;
    private Double initial;
    
    //    Throwing || investment
    private String type;

    private String active;


    @CreatedDate
    private Instant createdAt;
    @CreatedBy
    private String username;

}
