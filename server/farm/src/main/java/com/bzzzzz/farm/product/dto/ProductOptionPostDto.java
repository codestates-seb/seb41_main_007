package com.bzzzzz.farm.product.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProductOptionPostDto {
    @NotBlank
    private String productOptionName;

    private int price;

    private int stock;
}
