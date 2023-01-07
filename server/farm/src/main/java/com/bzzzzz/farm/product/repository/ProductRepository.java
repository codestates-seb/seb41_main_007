package com.bzzzzz.farm.product.repository;

import com.bzzzzz.farm.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAllByNameContainsOrBrandContains(String name, String brand, Pageable pageable);
}
