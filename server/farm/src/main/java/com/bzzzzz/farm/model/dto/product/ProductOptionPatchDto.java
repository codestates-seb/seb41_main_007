package com.bzzzzz.farm.model.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductOptionPatchDto {
    private Long productOptionId;
    private String productOptionName;
    private Integer price;
    private Integer stock;
}
