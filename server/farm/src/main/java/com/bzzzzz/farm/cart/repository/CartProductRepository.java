package com.bzzzzz.farm.cart.repository;

import com.bzzzzz.farm.cart.entiy.Cart;
import com.bzzzzz.farm.cart.entiy.CartProduct;
import com.bzzzzz.farm.product.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
    Optional<CartProduct> findByCartAndProductOption(Cart cart, ProductOption productOption);
}
