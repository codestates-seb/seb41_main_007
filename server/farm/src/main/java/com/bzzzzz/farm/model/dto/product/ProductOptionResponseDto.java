package com.bzzzzz.farm.model.dto.product;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductOptionResponseDto {
    private long productOptionId;
    private String productOptionName;
    private int price;
    private int stock;
}
