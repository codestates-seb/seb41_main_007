package com.bzzzzz.farm.cart.repository;

import com.bzzzzz.farm.cart.entiy.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
