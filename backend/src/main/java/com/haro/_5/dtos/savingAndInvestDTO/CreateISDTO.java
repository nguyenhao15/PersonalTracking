package com.haro._5.dtos.savingAndInvestDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import java.time.Instant;
import java.util.List;


@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class CreateISDTO {

    @Id
    private String _id;

    @NotBlank(message = "title is required")
    private String title;

    @NotBlank(message = "type is required")
    private String type;

    @Builder.Default
    private Double totalAmount = 0.0;

    @Builder.Default
    private Double initial = 0.0;

    @Builder.Default
    private String active = "active";

    @CreatedDate
    private Instant createdAt;

    @CreatedBy
    private String username;
}
