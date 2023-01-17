package com.bzzzzz.farm.domain.cart.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CartResponseDto {
    private List<CartProductResponseDto> cartProductResponseDtos;
}
