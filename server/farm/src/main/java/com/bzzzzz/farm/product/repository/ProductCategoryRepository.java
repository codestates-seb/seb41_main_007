package com.bzzzzz.farm.product.repository;

import com.bzzzzz.farm.product.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
