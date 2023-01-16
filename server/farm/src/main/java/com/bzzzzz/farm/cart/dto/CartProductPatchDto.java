package com.bzzzzz.farm.cart.dto;

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
