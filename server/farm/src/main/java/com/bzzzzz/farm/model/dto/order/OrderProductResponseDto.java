package com.bzzzzz.farm.model.dto.order;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OrderProductResponseDto {
    private long orderProductId;
    // 제품에 관한 내용
    private long productId;
    private String productName;
    private int productPrice;
    // 제품 옵션에 관한 내용
    private long productOptionId;
    private String productOptionName;
    private int productOptionPrice;
    private int quantity;
    // 배송에 관한 내용
    private String shippingCountry;
    private String shippingMethod;
    private int shippingPrice;
    private String waybillNumber;
    // 주문 상태
    private String orderStatus;

    @Builder
    public OrderProductResponseDto(long orderProductId,
                                   long productId,
                                   String productName,
                                   int productPrice,
                                   long productOptionId,
                                   String productOptionName,
                                   int quantity,
                                   int productOptionPrice,
                                   String shippingCountry,
                                   String shippingMethod,
                                   int shippingPrice,
                                   String waybillNumber,
                                   String orderStatus) {
        this.orderProductId = orderProductId;
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productOptionId = productOptionId;
        this.productOptionName = productOptionName;
        this.quantity = quantity;
        this.productOptionPrice = productOptionPrice;
        this.shippingCountry = shippingCountry;
        this.shippingMethod = shippingMethod;
        this.shippingPrice = shippingPrice;
        this.waybillNumber = waybillNumber;
        this.orderStatus = orderStatus;
    }
}
