package com.bzzzzz.farm.product.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter
public class ProductPostDto {
    @Setter
    private Long memberId;

    @NotBlank
    private String name;

    private int price;

    @NotBlank
    private String photo;

    @NotBlank
    private String brand;

    @NotBlank
    private String description;

    @NotBlank
    private String shippingCountry;

    @NotBlank
    private String shippingMethod;

    @Positive
    private int shippingPrice;

    private List<ProductCategoryPostDto> productCategoryPostDtos;

    private List<ProductOptionPostDto> productOptionPostDtos;
}
