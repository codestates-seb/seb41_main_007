package com.bzzzzz.farm.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;

@Entity
@Getter
@Setter
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
    private Integer productPrice;
    @Column(nullable = false, updatable = false)
    private Integer productOptionPrice;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Product.ShippingCountry shippingCountry;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Product.ShippingMethod shippingMethod;

    @Column(nullable = false, updatable = false)
    private Integer shippingPrice;

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
        PRODUCT_SHIPMENT(4, "제품 출고"),
        SHIPMENT_IN_PROGRESS(5, "배송 중"),
        SHIPMENT_COMPLETE(6, "배송 완료"),
        PURCHASE_CONFIRMATION(7, "구매 확정"),
        CANCEL(8, "주문 취소"),
        // 환불관련 ??
        ;
        private Integer step;
        private String status;
    }

    public OrderProduct() {
    }

    @Builder
    public OrderProduct(Product product, ProductOption productOption, Integer quantity, Integer productPrice, Integer productOptionPrice, Product.ShippingCountry shippingCountry, Product.ShippingMethod shippingMethod, Integer shippingPrice) {
        this.product = product;
        this.productOption = productOption;
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productOptionPrice = productOptionPrice;
        this.shippingCountry = shippingCountry;
        this.shippingMethod = shippingMethod;
        this.shippingPrice = shippingPrice;
    }
}
