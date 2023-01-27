package com.bzzzzz.farm.model.dto.cart;

import com.bzzzzz.farm.model.entity.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CartRequestDto {
    @Positive
    private Long productOptionId;

    private int quantity;

    // 편의 메서드
    public ProductOption getProductOption() {
        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(productOptionId);
        return productOption;
    }
}
