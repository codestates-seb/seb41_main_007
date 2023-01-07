package com.bzzzzz.farm.product.dto;

import com.bzzzzz.farm.product.entity.Product;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ProductDetailResponseDto {
    private Long productId;
    private String name;
    private int price;
    private String photo;
    private String shippingCountry;
    private String shippingMethod;
    private int shippingPrice;
    private String description;
    private String brand;
    private List<ProductOptionResponseDto> productOptionResponseDtos;
}
