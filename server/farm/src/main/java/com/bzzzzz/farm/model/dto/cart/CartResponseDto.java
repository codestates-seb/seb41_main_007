package com.bzzzzz.farm.model.dto.cart;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CartResponseDto {
    private List<CartProductResponseDto> cartProductResponseDtos;
}
