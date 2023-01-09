package com.bzzzzz.farm.category.controller;

import com.bzzzzz.farm.category.dto.CategoryPatchDto;
import com.bzzzzz.farm.category.dto.CategoryPostDto;
import com.bzzzzz.farm.category.entity.Category;
import com.bzzzzz.farm.category.mapper.CategoryMapper;
import com.bzzzzz.farm.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @PostMapping
    public ResponseEntity postCategory(@Valid @RequestBody CategoryPostDto categoryPostDto) {

        Category category = categoryService.createCategory(categoryMapper.categoryPostDtoToCategory(categoryPostDto));

        return new ResponseEntity(categoryMapper.categoryToCategoryResponseDto(category), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity patchCategory(@Valid @RequestBody CategoryPatchDto categoryPatchDto) {

        Category category = categoryService.updateCategory(categoryPatchDto);

        return new ResponseEntity(categoryMapper.categoryToCategoryResponseDto(category), HttpStatus.OK);
    }
}
