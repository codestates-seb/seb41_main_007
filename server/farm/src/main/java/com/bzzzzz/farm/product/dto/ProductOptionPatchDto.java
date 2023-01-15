package com.bzzzzz.farm.product.dto;

import lombok.Getter;

@Getter
public class ProductOptionPatchDto {
    private Long productOptionId;
    private String productOptionName;
    private Integer price;
    private Integer stock;
}
