package com.haro._5.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SIUpdate {

    @Id
    private String _id = new ObjectId().toString();

    private String walletId;
    private Long amount;
    private Long fee;
    //    Withdraw or sending
    private Boolean type;
    private LocalDate date;
}
