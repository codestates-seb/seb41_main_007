package com.bzzzzz.farm.cart.dto;

import com.bzzzzz.farm.cart.entiy.Cart;
import com.bzzzzz.farm.product.entity.ProductOption;
import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class CartProductPostDto {
    @Positive
    private Long cartId;

    @Positive
    private Long productOptionId;

    @Positive
    private int quantity;

    // 편의 메서드
    public Cart getCart() {
        Cart cart = new Cart();
        cart.setCartId(cartId);
        return cart;
    }

    public ProductOption getProductOption() {
        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(productOptionId);
        return productOption;
    }
}
