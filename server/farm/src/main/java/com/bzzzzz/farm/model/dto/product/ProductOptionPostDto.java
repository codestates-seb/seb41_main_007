package com.bzzzzz.farm.model.dto.product;

import com.bzzzzz.farm.model.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductOptionPostDto {
    @NotBlank
    private String productOptionName;

    private int price;

    private int stock;

    private Long productId;

    // 편의 메서드


    public ProductOptionPostDto(String productOptionName, int price, int stock) {
        this.productOptionName = productOptionName;
        this.price = price;
        this.stock = stock;
    }

    public Product getProduct() {
        Product product = new Product();
        product.setProductId(productId);
        return product;
    }
}
