package com.bzzzzz.farm.model.dto.product;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductSimpleResponseDto {

    private Long productId;

    private String name;

    private int price;

    private String photo;

    private String productStatus;
}
