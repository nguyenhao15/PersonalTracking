package com.haro._5.dtos.savingAndInvestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.List;


@AllArgsConstructor
@Data
public class SIInfoDTO {

    private String _id;

    private String title;
    private Double totalAmount;
    private Double initial;
    private Boolean active;
    private String type;


    @CreatedDate
    private Instant createdAt;

    @CreatedBy
    private String username;
}
