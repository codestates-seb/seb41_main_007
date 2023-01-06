package com.bzzzzz.farm.product.repository;

import com.bzzzzz.farm.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
