package com.bzzzzz.farm.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String tid;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Order.PaymentStatus paymentStatus = Order.PaymentStatus.COMPLETED;

}
