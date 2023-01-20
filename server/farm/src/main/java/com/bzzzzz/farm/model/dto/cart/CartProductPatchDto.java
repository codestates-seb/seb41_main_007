package com.bzzzzz.farm.model.dto.cart;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class CartProductPatchDto {
    @Positive
    private Long cartProductId;

    @Positive
    private Long cartId;

    private int quantity;
}
