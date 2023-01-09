package com.bzzzzz.farm.product.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductCategoryResponseDto {
    private Long productCategoryId;
    private Long categoryId;
    private String name;
}
