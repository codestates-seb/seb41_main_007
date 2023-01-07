package com.bzzzzz.farm.product.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class ProductOptionDto {
    @Getter
    public static class Post {
        @NotBlank
        private String productOptionName;

        private int price;

        private int stock;
    }
}
