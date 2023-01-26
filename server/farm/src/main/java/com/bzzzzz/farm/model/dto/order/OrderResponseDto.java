package com.bzzzzz.farm.model.dto.order;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class OrderResponseDto {
    private long orderId;
    // 주문자 정보
    private long memberId;
    private String memberName;
    // 받는사람 정보
    private String name;
    private String address;
    private String phone;
    // 제품 총가격 (배송비 포함)
    private int price;
    // 결제와 관련된 정보
    private String paymentMethod;
    private String paymentStatus;
    // 상세정보
    private List<OrderProductResponseDto> orderProductResponseDtos;
    private LocalDateTime createdAt;

    @Builder
    public OrderResponseDto(long orderId,
                            long memberId,
                            String memberName,
                            String name,
                            String address,
                            String phone,
                            int price,
                            String paymentMethod,
                            String paymentStatus,
                            List<OrderProductResponseDto> orderProductResponseDtos,
                            LocalDateTime createdAt) {
        this.orderId = orderId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.price = price;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.orderProductResponseDtos = orderProductResponseDtos;
        this.createdAt = createdAt;
    }
}
