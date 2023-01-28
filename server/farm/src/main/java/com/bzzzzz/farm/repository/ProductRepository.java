package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.repository.querydsl.ProductRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
}
