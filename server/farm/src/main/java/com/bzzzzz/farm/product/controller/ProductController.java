package com.bzzzzz.farm.product.controller;

import com.bzzzzz.farm.dto.MultiResponseDto;
import com.bzzzzz.farm.product.dto.ProductDeleteDto;
import com.bzzzzz.farm.product.dto.ProductPatchDto;
import com.bzzzzz.farm.product.dto.ProductPostDto;
import com.bzzzzz.farm.product.entity.Product;
import com.bzzzzz.farm.product.mapper.ProductMapper;
import com.bzzzzz.farm.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final ProductMapper productMapper;

    @PostMapping
    public ResponseEntity postProduct(@Valid @RequestBody ProductPostDto productPostDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        Product product = productService.createProduct(productMapper.productPostDtoToProduct(productPostDto));

        return new ResponseEntity(product.getProductId(), HttpStatus.CREATED);
    }

    @GetMapping("/{product-id}")
    public ResponseEntity getProduct(@Positive @PathVariable("product-id") long productId) {

        Product product = productService.findProduct(productId);

        return new ResponseEntity(productMapper.productToProductDetailResponseDto(product), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getProducts(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                      @RequestParam(required = false, defaultValue = "productId") String sort,
                                      @RequestParam(required = false, defaultValue = "descending") String order,
                                      @RequestParam(required = false, defaultValue = "") String keyword) {

        /** 허용 파라미터 외에는 defaultValue로 자동 설정됨
         * sort = productId(최신순), name(상품명), price(가격), brand(제조사), likeCount(인기순)
         * order = descending(내림차순), ascending(오름차순)
         * keyword = 검색어 (제품명, 브랜드 안에서 검색)
         * Todo category = 카테고리별 조회
         * */

        Page<Product> productPage = productService.findProducts(page - 1, sort, order, keyword);

        return new ResponseEntity(
                new MultiResponseDto(productMapper.productsToProductSimpleResponseDtos(productPage.getContent()), productPage),
                HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity patchProduct(@Valid @RequestBody ProductPatchDto productPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        Product updateProduct = productService.updateProduct(productMapper.productPatchDtoToProduct(productPatchDto));

        return new ResponseEntity(productMapper.productToProductDetailResponseDto(updateProduct), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteProduct(@Valid @RequestBody ProductDeleteDto productDeleteDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productService.deleteProduct(productDeleteDto.getProductId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
