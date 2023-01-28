package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.product.ProductCategoryPatchDto;
import com.bzzzzz.farm.model.dto.product.ProductCategoryPostDto;
import com.bzzzzz.farm.model.dto.product.ProductOptionPatchDto;
import com.bzzzzz.farm.model.dto.product.ProductOptionPostDto;
import com.bzzzzz.farm.service.CategoryService;
import com.bzzzzz.farm.service.ProductCategoryService;
import com.bzzzzz.farm.service.ProductOptionService;
import com.bzzzzz.farm.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
public class ProductSubController {
    private final ProductService productService;
    private final ProductCategoryService productCategoryService;
    private final ProductOptionService productOptionService;
    private final CategoryService categoryService;

    /**
     * 카테고리 관련 기능
     */
    @PostMapping("/products/categories")
    public ResponseEntity postProductCategory(@Valid @RequestBody ProductCategoryPostDto productCategoryPostDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productService.findVerifiedProduct(productCategoryPostDto.getProductId());
        categoryService.findVerifiedCategory(productCategoryPostDto.getCategoryId());

        return new ResponseEntity(productCategoryService.createProductCategory(productCategoryPostDto), HttpStatus.CREATED);
    }

    @PatchMapping("/products/categories")
    public ResponseEntity patchProductCategory(@Valid @RequestBody ProductCategoryPatchDto productCategoryPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        categoryService.findVerifiedCategory(productCategoryPatchDto.getCategoryId());

        return new ResponseEntity(productCategoryService.updateProductCategory(productCategoryPatchDto), HttpStatus.OK);
    }

    @DeleteMapping("/products/categories/{product-category-id}")
    public ResponseEntity deleteProductCategory(@Positive @PathVariable("product-category-id") long productCategoryId) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productCategoryService.deleteProductCategory(productCategoryId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    /**
     * 제품 옵션 관련 기능
     */
    @PostMapping("/products/options")
    public ResponseEntity postProductOption(@Valid @RequestBody ProductOptionPostDto productOptionPostDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productService.findVerifiedProduct(productOptionPostDto.getProductId());

        productOptionService.createProductOption(productOptionPostDto);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/products/options")
    public ResponseEntity patchProductOption(@Valid @RequestBody ProductOptionPatchDto productOptionPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productOptionService.updateProductOption(productOptionPatchDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/products/options/{product-option-id}")
    public ResponseEntity deleteProductOption(@Positive @PathVariable("product-option-id") long productOptionId) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productOptionService.deleteProductOption(productOptionId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
