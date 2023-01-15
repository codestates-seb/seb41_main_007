package com.bzzzzz.farm.cart.entiy;

import com.bzzzzz.farm.audit.Auditable;
import com.bzzzzz.farm.product.entity.ProductOption;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class CartProduct extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartProductId;

    @ManyToOne
    @JoinColumn(name = "CART_ID")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_OPTION_ID")
    private ProductOption productOption;

    @Column(nullable = false)
    private Integer quantity;

    // 편의 메서드
    public void calculateQuantity(int quantity) {
        this.quantity += quantity;
    }
}
