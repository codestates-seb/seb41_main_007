package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
