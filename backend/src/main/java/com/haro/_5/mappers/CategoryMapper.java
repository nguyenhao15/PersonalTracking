package com.haro._5.mappers;

import com.haro._5.dtos.CategoryDTO.CategoryInfo;
import com.haro._5.dtos.CategoryDTO.UpdateCategoryRequest;
import com.haro._5.models.Category;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;


@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryInfo toDto(Category category);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UpdateCategoryRequest request, @MappingTarget Category category);
}
