package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.CategoryMapper;
import com.bzzzzz.farm.model.dto.category.CategoryPatchDto;
import com.bzzzzz.farm.model.dto.category.CategoryPostDto;
import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @PostMapping("/categories")
    public ResponseEntity postCategory(@Valid @RequestBody CategoryPostDto categoryPostDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        categoryService.createCategory(categoryMapper.categoryPostDtoToCategory(categoryPostDto));

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/categories")
    public ResponseEntity patchCategory(@Valid @RequestBody CategoryPatchDto categoryPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        categoryService.updateCategory(categoryPatchDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity getCategories() {

        List<Category> categories = categoryService.findCategories();

        return new ResponseEntity(categoryMapper.categoriesToCategoryResponseDtos(categories), HttpStatus.OK);
    }

    @DeleteMapping("/categories/{category-id}")
    public ResponseEntity deleteCategory(@Positive @PathVariable("category-id") long categoryId) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        categoryService.deleteCategory(categoryId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
