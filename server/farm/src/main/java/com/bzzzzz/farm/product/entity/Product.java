package com.bzzzzz.farm.product.entity;

import com.bzzzzz.farm.audit.Auditable;
import com.bzzzzz.farm.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Product extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String description; // 상품 메인 글

    @Column(nullable = false)
    private String photo; // 썸네일

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private int viewCount;

    @Column(nullable = false)
    private int likeCount;

    @Column(nullable = false)
    private int soldCount;

    @OneToMany(mappedBy = "product", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<ProductOption> productOptions = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member; // 관리자만 올 수 있음

    // 연관 관계 매핑 관련 메서드
    public void addProductOption(ProductOption productOption) {
        this.productOptions.add(productOption);
        if (productOption.getProduct() != this) {
            productOption.setProduct(this);
        }
    }
}
