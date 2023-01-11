package com.bzzzzz.farm.product.controller;

import com.bzzzzz.farm.category.service.CategoryService;
import com.bzzzzz.farm.dto.IdRequestDto;
import com.bzzzzz.farm.product.dto.ProductCategoryPatchDto;
import com.bzzzzz.farm.product.dto.ProductCategoryPostDto;
import com.bzzzzz.farm.product.entity.ProductCategory;
import com.bzzzzz.farm.product.mapper.ProductMapper;
import com.bzzzzz.farm.product.service.ProductCategoryService;
import com.bzzzzz.farm.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/productCategories") //Todo: 이게 맞는가 ?
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;
    private final ProductService productService;
    private final CategoryService categoryService;
    private final ProductMapper productMapper;

    @PostMapping
    public ResponseEntity postProductCategory(@Valid @RequestBody ProductCategoryPostDto productCategoryPostDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productService.findVerifiedProduct(productCategoryPostDto.getProductId());
        categoryService.findVerifiedCategory(productCategoryPostDto.getCategoryId());

        ProductCategory productCategory = productCategoryService.createProductCategory(productMapper.productCategoryPostDtoToProductCategory(productCategoryPostDto));

        return new ResponseEntity(productMapper.productCategoryToProductCategoryResponseDto(productCategory), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity patchProductCategory(@Valid @RequestBody ProductCategoryPatchDto productCategoryPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        categoryService.findVerifiedCategory(productCategoryPatchDto.getCategoryId());

        ProductCategory productCategory = productCategoryService.updateProductCategory(productCategoryPatchDto);

        return new ResponseEntity(productMapper.productCategoryToProductCategoryResponseDto(productCategory), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteProductCategory(@Valid @RequestBody IdRequestDto idRequestDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productCategoryService.deleteProductCategory(idRequestDto.getId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
