package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    Optional<ProductCategory> findByProductAndCategory(Product product, Category category);
}
