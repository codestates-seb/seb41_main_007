package com.bzzzzz.farm.cart.repository;

import com.bzzzzz.farm.cart.entiy.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
}
