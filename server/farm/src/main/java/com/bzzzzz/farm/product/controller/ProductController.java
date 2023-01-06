package com.bzzzzz.farm.product.controller;

import com.bzzzzz.farm.product.dto.ProductDto;
import com.bzzzzz.farm.product.entity.Product;
import com.bzzzzz.farm.product.mapper.ProductMapper;
import com.bzzzzz.farm.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final ProductMapper productMapper;

    @PostMapping
    public ResponseEntity postProduct(@Valid @RequestBody ProductDto.Post productPostDto) {

        //Todo: productPostDto.setMemberId(); // 로그인 들어오고 추가 해야함

        Product product = productService.createProduct(productMapper.productPostDtoToProduct(productPostDto));

        return new ResponseEntity(product.getProductId(), HttpStatus.CREATED);
    }


}
