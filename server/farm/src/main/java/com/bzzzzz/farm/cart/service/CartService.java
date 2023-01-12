package com.bzzzzz.farm.cart.service;

import com.bzzzzz.farm.cart.entiy.Cart;
import com.bzzzzz.farm.cart.repository.CartRepository;
import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public Cart findCart(long cartId) {
        return findVerifiedCart(cartId);
    }

    /**
     * 서브 메서드
     */
    private Cart findVerifiedCart(long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        return optionalCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
    }
}
