package com.haro._5.controllers;

import com.haro._5.dtos.CategoryDTO.CategoryInfo;
import com.haro._5.dtos.CategoryDTO.CreateCategoryDTO;
import com.haro._5.dtos.CategoryDTO.UpdateCategoryRequest;
import com.haro._5.dtos.response.ApiResponse;
import com.haro._5.services.CategoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryInfo>>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable String id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CreateCategoryDTO request) {
        return ResponseEntity.ok(categoryService.createCategory(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable String id, @RequestBody UpdateCategoryRequest request) {
        return categoryService.updateCategory(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteCategory(@PathVariable String id) {
        return ResponseEntity.ok(categoryService.deleteCategory(id));
    }


}
