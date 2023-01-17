package com.bzzzzz.farm.domain.cart.service;

import com.bzzzzz.farm.domain.cart.entiy.Cart;
import com.bzzzzz.farm.domain.cart.entiy.CartProduct;
import com.bzzzzz.farm.domain.cart.repository.CartProductRepository;
import com.bzzzzz.farm.domain.cart.repository.CartRepository;
import com.bzzzzz.farm.global.exception.BusinessLogicException;
import com.bzzzzz.farm.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartProductRepository cartProductRepository;

    @Transactional(readOnly = true)
    public Cart findCart(long cartId) {
        return findVerifiedCart(cartId);
    }

    public void createCartProduct(CartProduct cartProduct) {
        Optional<CartProduct> optionalCartProduct = cartProductRepository.findByCartAndProductOption(cartProduct.getCart(), cartProduct.getProductOption());

        if (optionalCartProduct.isPresent()) {
            updateCartProduct(optionalCartProduct.get().getCartProductId(), cartProduct.getQuantity());
        } else {
            cartProductRepository.save(cartProduct);
        }
    }

    public void updateCartProduct(long cartProductId, Integer quantity) {
        CartProduct findCartProduct = findVerifiedCartProduct(cartProductId);

        // Optional.ofNullable(quantity).ifPresent(data -> findCartProduct.calculateQuantity(data));
        findCartProduct.calculateQuantity(quantity); // 장바구니 수정항목이 추가 되면 옵셔널로 변경하시오

        if (findCartProduct.getQuantity() <= 0) {
            deleteCartProduct(findCartProduct.getCartProductId());
        }
    }

    public void deleteCartProduct(long cartProductId) {
        CartProduct cartProduct = findVerifiedCartProduct(cartProductId);

        cartProductRepository.delete(cartProduct);
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private Cart findVerifiedCart(long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        return optionalCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    private CartProduct findVerifiedCartProduct(long cartProductId) {
        Optional<CartProduct> optionalCartProduct = cartProductRepository.findById(cartProductId);
        return optionalCartProduct.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_PRODUCT_NOT_FOUND));
    }
}
