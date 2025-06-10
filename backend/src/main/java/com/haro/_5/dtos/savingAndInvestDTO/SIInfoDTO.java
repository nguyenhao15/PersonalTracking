package com.haro._5.dtos.savingAndInvestDTO;

import com.haro._5.models.SIUpdate;

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
    private Long totalAmount;
    private Long initial;

    private List<SIUpdate> updates ;

    @CreatedDate
    private Instant createdAt;

    @CreatedBy
    private String username;
}
