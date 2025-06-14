package com.haro._5.dtos.CategoryDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;

@AllArgsConstructor
@Data
@Builder
public class CreateCategoryDTO {

    @Id
    private String _id;

    @NotBlank(message = "categoryName is required")
    private String categoryName;

    @Builder.Default
    private Boolean categoryType = false;

    private String categoryIcon;


    private String createdBy;
    private Instant createdAt;
    private Instant updatedAt;
}
