package com.bzzzzz.farm.domain.cart.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CartProductResponseDto {
    // 장바구니에 담은 제품 정보
    private Long cartProductId;
    private Integer quantity;

    // 상품에 관한 정보
    private Long productId;
    private String productName;
    private String photo;
    private Integer productPrice;

    // 상품 옵션에 관한 정보
    private Long productOptionId;
    private String productOptionName;
    private Integer productOptionPrice;
    private Integer stock;

    // 배송에 관한 정보
    private String shippingCountry;
    private String shippingMethod;
    private Integer shippingPrice;

    // 장바구니에 담은 날짜 정보
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
