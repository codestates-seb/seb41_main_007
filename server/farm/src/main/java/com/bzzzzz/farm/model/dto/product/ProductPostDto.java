package com.bzzzzz.farm.model.dto.product;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Builder
public class ProductPostDto {
    @Setter
    private Long memberId;

    @NotBlank
    private String name;
    @Min(value = 0)
    private int price;

    @NotBlank
    private String photo;

    @NotBlank
    private String brand;

    @NotBlank
    private String body;

    @NotBlank
    private String description;

    @NotBlank
    private String shippingCountry;

    @NotBlank
    private String shippingMethod;

    @Min(value = 0)
    private int shippingPrice;

    @NotNull
    private List<ProductCategoryPostDto> productCategoryPostDtos;

    @NotNull
    private List<ProductOptionPostDto> productOptionPostDtos;
}
