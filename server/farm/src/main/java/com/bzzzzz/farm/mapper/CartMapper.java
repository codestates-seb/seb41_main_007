package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.cart.CartProductPostDto;
import com.bzzzzz.farm.model.dto.cart.CartProductResponseDto;
import com.bzzzzz.farm.model.dto.cart.CartResponseDto;
import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.CartProduct;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductOption;
import org.mapstruct.Mapper;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartProduct cartProductPostDtoToCartProduct(CartProductPostDto cartProductPostDto);

    default CartResponseDto cartToCartResponseDto(Cart cart) {
        if (cart == null) {
            return null;
        }

        return CartResponseDto.builder()
                .cartProductResponseDtos(cart.getCartProducts().stream()
                        .map(cartProduct -> cartProductToCartProductResponseDto(cartProduct))
                        .collect(Collectors.toList()))
                .build();
    }

    default CartProductResponseDto cartProductToCartProductResponseDto(CartProduct cartProduct) {
        if (cartProduct == null) {
            return null;
        }

        ProductOption productOption = cartProduct.getProductOption();
        Product product = productOption.getProduct();

        return CartProductResponseDto.builder()
                .cartProductId(cartProduct.getCartProductId())
                .quantity(cartProduct.getQuantity())
                // 상품에 관한 정보
                .productId(product.getProductId())
                .productName(product.getName())
                .photo(product.getPhoto())
                .productPrice(product.getPrice())
                // 상품 옵션에 관한 정보
                .productOptionId(productOption.getProductOptionId())
                .productOptionName(productOption.getProductOptionName())
                .productOptionPrice(productOption.getPrice())
                .stock(productOption.getStock())
                //배송에 관한 정보
                .shippingCountry(product.getShippingCountry().getShippingType())
                .shippingMethod(product.getShippingMethod().getShippingMethod())
                .shippingPrice(product.getShippingPrice())
                // 장바구니에 담은 날짜 정보
                .createdAt(cartProduct.getCreatedAt())
                .modifiedAt(cartProduct.getModifiedAt())
                .build();

    }

}