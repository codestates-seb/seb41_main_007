package com.bzzzzz.farm.product.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class ProductDeleteDto {
    @Positive
    private Long productId;
}
