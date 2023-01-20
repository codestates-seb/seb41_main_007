package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.CartProduct;
import com.bzzzzz.farm.model.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
    Optional<CartProduct> findByCartAndProductOption(Cart cart, ProductOption productOption);
}
