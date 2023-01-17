package com.bzzzzz.farm.domain.product.repository;

import com.bzzzzz.farm.domain.category.entity.Category;
import com.bzzzzz.farm.domain.product.entity.Product;
import com.bzzzzz.farm.domain.product.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    Optional<ProductCategory> findByProductAndCategory(Product product, Category category);
}
