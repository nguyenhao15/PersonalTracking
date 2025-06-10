package com.haro._5.dtos.savingAndInvestDTO;

import com.haro._5.models.SIUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import javax.crypto.Mac;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Data
@NoArgsConstructor

public class CreateISDTO {

    @Id
    private String _id;

    @NotBlank(message = "Title is required")
    private String title;

    private Long totalAmount;

    @NotNull(message = "initial is required")
    private Long initial;

    private List<SIUpdate> updates;

    @CreatedDate
    private Instant createdAt;

    @CreatedBy
    private String username;
}
