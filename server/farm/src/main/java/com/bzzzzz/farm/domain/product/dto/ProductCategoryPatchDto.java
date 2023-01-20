package com.bzzzzz.farm.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryPatchDto {
    private Long productCategoryId;
    private Long categoryId;
}
