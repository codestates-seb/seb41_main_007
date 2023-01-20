package com.bzzzzz.farm.model.dto.product;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Builder
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
}
