package com.bzzzzz.farm.domain.product.entity;

import com.bzzzzz.farm.global.audit.Auditable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ProductOption extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productOptionId;
    @Column(nullable = false)
    private String productOptionName;

    private Integer price;

    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;
}
