package com.bzzzzz.farm.cart.service;

import com.bzzzzz.farm.cart.entiy.CartProduct;
import com.bzzzzz.farm.cart.repository.CartProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartProductService {
    private final CartProductRepository cartProductRepository;

    public void createCartProduct(CartProduct cartProduct) {

        Optional<CartProduct> optionalCartProduct = cartProductRepository.findByCartAndProductOption(cartProduct.getCart(), cartProduct.getProductOption());
        if (optionalCartProduct.isPresent()) {
            optionalCartProduct.get().calculateQuantity(cartProduct.getQuantity());
        } else {
            cartProductRepository.save(cartProduct);
        }
    }

    /**
     * 서브 메서드
     */
}
