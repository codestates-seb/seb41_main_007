package com.bzzzzz.farm.product.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.util.List;

@Getter
public class ProductPatchDto {
    @Positive
    private Long productId;
    @Setter
    private Long memberId;

    private String name;

    private Integer price;

    private String photo;

    private String brand;

    private String description;

    private String productStatus;

    private String shippingCountry;

    private String shippingMethod;

    private Integer shippingPrice;

    private List<ProductCategoryPatchDto> productCategoryPatchDtos;

    private List<ProductOptionPatchDto> productOptionPatchDtos;
}
