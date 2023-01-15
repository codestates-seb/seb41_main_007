package com.bzzzzz.farm.product.dto;

import com.bzzzzz.farm.product.entity.Product;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProductOptionPostDto {
    @NotBlank
    private String productOptionName;

    private int price;

    private int stock;

    private Long productId;

    // 편의 메서드
    public Product getProduct() {
        Product product = new Product();
        product.setProductId(productId);
        return product;
    }
}
