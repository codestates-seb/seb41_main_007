package com.bzzzzz.farm.domain.cart.repository;

import com.bzzzzz.farm.domain.cart.entiy.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
