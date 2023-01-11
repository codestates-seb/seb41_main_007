package com.bzzzzz.farm.cart.mapper;

import com.bzzzzz.farm.cart.dto.CartProductPostDto;
import com.bzzzzz.farm.cart.entiy.CartProduct;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartProductMapper {
    CartProduct cartProductPostDtoToCartProduct(CartProductPostDto cartProductPostDto);
}
