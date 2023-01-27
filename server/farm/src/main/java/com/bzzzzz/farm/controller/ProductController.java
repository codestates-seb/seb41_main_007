package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.ProductMapper;
import com.bzzzzz.farm.model.dto.MultiResponseDto;
import com.bzzzzz.farm.model.dto.SingleResponseDto;
import com.bzzzzz.farm.model.dto.product.ProductPatchDto;
import com.bzzzzz.farm.model.dto.product.ProductPostDto;
import com.bzzzzz.farm.model.dto.product.ProductSimpleResponseDto;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.service.LikeService;
import com.bzzzzz.farm.service.ProductCategoryService;
import com.bzzzzz.farm.service.ProductOptionService;
import com.bzzzzz.farm.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final LikeService likeService;
    private final ProductMapper productMapper;
    private final ProductCategoryService productCategoryService;
    private final ProductOptionService productOptionService;

    @PostMapping("/products")
    @Transactional
    public ResponseEntity postProduct(@Valid @RequestBody ProductPostDto productPostDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        Product product = productService.createProduct(productMapper.productPostDtoToProduct(productPostDto));
        product.getProductCategories().stream()
                .forEach(productCategory -> productCategoryService.createProductCategory(productCategory));
        product.getProductOptions().stream()
                .forEach(productOption -> productOptionService.createProductOption(productOption));


        return new ResponseEntity(new SingleResponseDto(product.getProductId()), HttpStatus.CREATED);
    }

    @GetMapping("/products/{product-id}")
    public ResponseEntity getProduct(@Positive @PathVariable("product-id") long productId) {

        Product product = productService.findProduct(productId);

        Boolean isLiked = null;
        //Todo: 로그인 유무에 따라 내가 좋아요를 눌렀는가를 표시해주는 메서드 추가 예정
        // isLiked = likeService.isLiked(member, product);

        return new ResponseEntity(productMapper.productToProductDetailResponseDto(product, false), HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity getProducts(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                      @Positive @RequestParam(required = false, defaultValue = "40") int size,
                                      @RequestParam(required = false) Long categoryId,
                                      @RequestParam(required = false, defaultValue = "productId") String sort,
                                      @RequestParam(required = false, defaultValue = "descending") String order,
                                      @RequestParam(required = false) String keyword) {

        /** 허용 파라미터 외에는 defaultValue로 자동 설정됨
         * page = 원하는 페이지
         * size = 한 페이지당 볼 게시물 수
         * categoryId = 카테고리 별로 보고 싶은 경우
         * sort = productId(최신순), name(상품명), price(가격), brand(제조사), likeCount(인기순), soldCount(판매량순)
         * order = descending(내림차순), ascending(오름차순)
         * keyword = 검색어 (제품명, 본문, 브랜드 안에서 검색)
         * */

        Page<ProductSimpleResponseDto> productPage = productService.findProducts(page - 1, size, sort, order, categoryId, keyword);

        return new ResponseEntity(new MultiResponseDto(productPage.getContent(), productPage), HttpStatus.OK);
    }

    @PatchMapping("/products")
    public ResponseEntity patchProduct(@Valid @RequestBody ProductPatchDto productPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productService.updateProduct(productPatchDto);

        return new ResponseEntity(new SingleResponseDto(productPatchDto.getProductId()), HttpStatus.OK);
    }

    @DeleteMapping("/products/{product-id}")
    public ResponseEntity deleteProduct(@Positive @PathVariable("product-id") long productId) {
        //Todo: 로그인 관련 기능 들어오면 ADMIN 계정인지 확인하는 로직 필요

        productService.deleteProduct(productId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
