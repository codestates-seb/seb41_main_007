package com.bzzzzz.farm.product.dto;

import lombok.Getter;

@Getter
public class ProductOptionPatchDto {//Todo: 옵션부분 수정시 반영되도록 해야함
    private Long productOptionId;
    private String productOptionName;
    private Integer price;
    private Integer stock;
}
