package com.bzzzzz.farm.category.controller;

import com.bzzzzz.farm.category.dto.CategoryPatchDto;
import com.bzzzzz.farm.category.dto.CategoryPostDto;
import com.bzzzzz.farm.category.entity.Category;
import com.bzzzzz.farm.category.mapper.CategoryMapper;
import com.bzzzzz.farm.category.service.CategoryService;
import com.bzzzzz.farm.dto.IdRequestDto;
import com.bzzzzz.farm.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @PostMapping
    public ResponseEntity postCategory(@Valid @RequestBody CategoryPostDto categoryPostDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요
        Category category = categoryService.createCategory(categoryMapper.categoryPostDtoToCategory(categoryPostDto));

        return new ResponseEntity(categoryMapper.categoryToCategoryResponseDto(category), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity patchCategory(@Valid @RequestBody CategoryPatchDto categoryPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요
        Category category = categoryService.updateCategory(categoryPatchDto);

        return new ResponseEntity(categoryMapper.categoryToCategoryResponseDto(category), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCategories() {

        List<Category> categories = categoryService.findCategories();

        return new ResponseEntity(new SingleResponseDto(categoryMapper.categoriesToCategoryResponseDtos(categories)), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteCategory(@Valid @RequestBody IdRequestDto idRequestDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        categoryService.deleteCategory(idRequestDto.getId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}