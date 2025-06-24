package com.haro._5.services;

import com.haro._5.dtos.CategoryDTO.CategoryInfo;
import com.haro._5.dtos.CategoryDTO.CreateCategoryDTO;
import com.haro._5.dtos.CategoryDTO.UpdateCategoryRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.dtos.response.ResponseBuilder;
import com.haro._5.exceptions.NotFoundException;
import com.haro._5.mappers.CategoryMapper;
import com.haro._5.models.Category;

import com.haro._5.repositories.CategoryRepo;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    @Autowired
    private final CategoryRepo repo;

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private ResponseBuilder responseBuilder;

    public ApiResponse<List<CategoryInfo>> getAllCategories() {
        List<CategoryInfo> categories = repo.findAll()
                .stream()
                .map(categoryMapper::toDto)
                .toList();
        return new ApiResponse<>(200, "Fetching categories successfully!", categories);
    }

    public ResponseEntity<?> getCategoryById(String id) {
        Category category = repo.findById(id).orElseThrow(() -> new NotFoundException(id + "Not found"));
        CategoryInfo dto = categoryMapper.toDto(category);
        return responseBuilder.success(dto, "Transaction found successfully!");
    }

    public ResponseEntity<?> createCategory(@NotNull CreateCategoryDTO request) {

        Category category = Category.builder()
                .categoryName(request.getCategoryName())
                .categoryType(request.getCategoryType())
                .isParent(request.getIsParent())
                .parentId(request.getParentId())
                .build();
        repo.save(category);
        CategoryInfo dto = categoryMapper.toDto(category);
        return responseBuilder.created(dto, "Category created successfully!");
    }

    public ResponseEntity<?> updateCategory(String id, UpdateCategoryRequest request) {
        Category category = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found with Id: " + id));
        categoryMapper.update(request, category);

        Category updatedCategory = repo.save(category);

        CategoryInfo dto = categoryMapper.toDto(updatedCategory);
        return responseBuilder.success(dto, "Category updated successfully!");
    }

    public ApiResponse<String> deleteCategory(String id) {
        Category category = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found with Id" + id));
        repo.deleteById(id);
        return new ApiResponse<>(200, "Category deleted successfully", id);
    }

}
