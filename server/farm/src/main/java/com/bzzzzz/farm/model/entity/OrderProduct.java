package com.bzzzzz.farm.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderProduct extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderProductId;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID", nullable = false, updatable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID", nullable = false, updatable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_OPTION_ID", nullable = false, updatable = false)
    private ProductOption productOption;

    @Column(nullable = false, updatable = false)
    @Min(1)
    private Integer quantity;

    @Column(nullable = false, updatable = false)
    private Integer price;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.ORDER_RECEIVED;

    private String waybillNumber;

    // 연관 관계 매핑 관련 메서드 및 이넘
    @Getter
    @AllArgsConstructor

    public enum OrderStatus {
        ORDER_RECEIVED(1, "주문 접수"),
        PAYMENT_COMPLETED(2, "결제 완료"),
        PRODUCT_PREPARATION(3, "상품 준비"),
        SHIPMENT_IN_PROGRESS(4, "배송 중"),
        SHIPMENT_COMPLETE(5, "배송 완료"),
        PURCHASE_CONFIRMATION(6, "구매 확정"),
        // 환불관련 ??
        ;
        private Integer step;
        private String status;
    }
}
