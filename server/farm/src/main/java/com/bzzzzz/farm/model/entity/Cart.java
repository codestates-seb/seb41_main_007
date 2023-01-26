package com.bzzzzz.farm.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Cart extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_OPTION_ID")
    private ProductOption productOption;

    @Column(nullable = false)
    private Integer quantity;

    // 편의 메서드
    public void calculateQuantity(int quantity) {
        this.quantity += quantity;
    }

    public Cart() {
    }

    @Builder
    public Cart(Member member, ProductOption productOption, Integer quantity) {
        this.member = member;
        this.productOption = productOption;
        this.quantity = quantity;
    }
}
