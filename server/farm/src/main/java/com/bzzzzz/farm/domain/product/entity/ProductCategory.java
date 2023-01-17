package com.bzzzzz.farm.domain.product.entity;

import com.bzzzzz.farm.global.audit.Auditable;
import com.bzzzzz.farm.domain.category.entity.Category;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ProductCategory extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productCategoryId;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID", nullable = false)
    private Category category;
}
