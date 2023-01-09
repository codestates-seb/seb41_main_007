package com.bzzzzz.farm.product.entity;

import com.bzzzzz.farm.audit.Auditable;
import com.bzzzzz.farm.category.entity.Category;
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
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;
}
