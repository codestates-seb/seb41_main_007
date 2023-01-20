package com.bzzzzz.farm.domain.product.dto;

import com.bzzzzz.farm.domain.category.entity.Category;
import com.bzzzzz.farm.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryPostDto {
    @Positive
    private Long productId;
    @Positive
    private Long categoryId;

    // 편의 메서드


    public ProductCategoryPostDto(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Product getProduct() {
        Product product = new Product();
        product.setProductId(productId);
        return product;
    }

    public Category getCategory() {
        return new Category(categoryId);
    }
}
