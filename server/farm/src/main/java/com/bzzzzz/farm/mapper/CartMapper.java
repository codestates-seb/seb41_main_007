package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.cart.CartPostDto;
import com.bzzzzz.farm.model.dto.cart.CartResponseDto;
import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductOption;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartMapper {
    Cart cartPostDtoToCart(CartPostDto cartPostDto);

    List<CartResponseDto> cartsToCartResponseDtos(List<Cart> carts);

    default CartResponseDto cartToCartResponseDto(Cart cart) {
        if (cart == null) {
            return null;
        }

        ProductOption productOption = cart.getProductOption();
        Product product = productOption.getProduct();

        return CartResponseDto.builder()
                .cartId(cart.getCartId())
                .quantity(cart.getQuantity())
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
                .createdAt(cart.getCreatedAt())
                .modifiedAt(cart.getModifiedAt())
                .build();

    }

}
