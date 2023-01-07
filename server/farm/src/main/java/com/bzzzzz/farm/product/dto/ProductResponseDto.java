package com.bzzzzz.farm.product.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductResponseDto {

    private Long productId;

    private String name;

    private int price;

    private String photo;

}
