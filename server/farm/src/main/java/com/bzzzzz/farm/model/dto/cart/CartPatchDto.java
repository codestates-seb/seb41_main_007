package com.bzzzzz.farm.model.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CartPatchDto {
    @Positive
    private Long cartId;

    private int quantity;
}
