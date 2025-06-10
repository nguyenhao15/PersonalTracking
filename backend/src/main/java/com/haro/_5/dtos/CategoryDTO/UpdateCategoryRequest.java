package com.haro._5.dtos.CategoryDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UpdateCategoryRequest {

    private String categoryName;
    private Boolean categoryType;
}
