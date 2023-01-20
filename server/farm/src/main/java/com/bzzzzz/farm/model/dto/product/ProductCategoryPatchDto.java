package com.bzzzzz.farm.model.dto.product;

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
