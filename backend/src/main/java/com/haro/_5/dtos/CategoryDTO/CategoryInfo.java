package com.haro._5.dtos.CategoryDTO;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class CategoryInfo {

    private String _id;
    private String categoryName;
    private Boolean categoryType;
    private String createdBy;

}
