package com.bzzzzz.farm.cart.service;

import com.bzzzzz.farm.cart.entiy.CartProduct;
import com.bzzzzz.farm.cart.repository.CartProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartProductService {
    private final CartProductRepository cartProductRepository;

    public void createCartProduct(CartProduct cartProduct) {



        cartProductRepository.save(cartProduct);
    }
}
