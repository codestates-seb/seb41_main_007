package com.bzzzzz.farm.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "ORDERS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false, updatable = false)
    private Member member; // 주문자

    @Column(nullable = false)
    private String address; // 실제 수령 주소

    @Column(nullable = false)
    private String name; // 수령자

    @OneToMany(mappedBy = "order", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<OrderProduct> orderProducts = new ArrayList<>();

    private String phone; // 수령자 핸드폰 번호

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod = PaymentMethod.DEFAULT;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.DEFAULT;

    // 연관 관계 매핑 관련 메서드 및 이넘
    public void addOrderProduct(OrderProduct orderProduct) {
        this.orderProducts.add(orderProduct);
        if (orderProduct.getOrder() != this) {
            orderProduct.setOrder(this);
        }
    }

    @Getter
    @AllArgsConstructor
    public enum PaymentMethod {
        DEFAULT(1, "결제 전"),
        BANK_BOOK(2, "무통장입금"),
        KAKAO_PAY(3, "카카오페이"),
        CREDIT_CARD(4, "신용카드"),
        ;
        private Integer code;
        private String method;
    }

    @Getter
    @AllArgsConstructor
    public enum PaymentStatus {
        DEFAULT(1, "결제 전"),
        COMPLETED(2, "결제 완료"),
        CANCEL(3, "결제 취소"),
        ;
        private Integer code;
        private String status;
    }
}
