package com.bzzzzz.farm.domain.product.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

    @NotNull
    private List<ProductCategoryPostDto> productCategoryPostDtos;

    @NotNull
    private List<ProductOptionPostDto> productOptionPostDtos;
}
