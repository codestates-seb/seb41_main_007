package com.bzzzzz.farm.product.repository;

import com.bzzzzz.farm.category.entity.Category;
import com.bzzzzz.farm.product.entity.Product;
import com.bzzzzz.farm.product.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    Optional<ProductCategory> findByProductAndCategory(Product product, Category category);
}
