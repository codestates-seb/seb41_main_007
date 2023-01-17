package com.bzzzzz.farm.domain.product.entity;

import com.bzzzzz.farm.global.audit.Auditable;
import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.review.entity.Review;
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
    private Integer price;

    @Column(nullable = false)
    private String description; // 상품 메인 글

    @Column(nullable = false)
    private String photo; // 썸네일

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus = ProductStatus.PREPARING_FOR_SALE;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ShippingCountry shippingCountry;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ShippingMethod shippingMethod;

    @Column(nullable = false)
    private Integer shippingPrice;

    @Column(nullable = false)
    private Integer viewCount = 0;

    @Column(nullable = false)
    private Integer likeCount = 0;

    @Column(nullable = false)
    private Integer soldCount = 0;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<ProductOption> productOptions = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<ProductCategory> productCategories = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Review> reviews = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member; // 관리자만 올 수 있음

    // 연관 관계 매핑 관련 메서드 및 이넘
    public void addProductOption(ProductOption productOption) {
        this.productOptions.add(productOption);
        if (productOption.getProduct() != this) {
            productOption.setProduct(this);
        }
    }

    public void addProductCategory(ProductCategory productCategory) {
        this.productCategories.add(productCategory);
        if (productCategory.getProduct() != this) {
            productCategory.setProduct(this);
        }
    }

    public enum ProductStatus {
        PREPARING_FOR_SALE(1, "판매 준비 중"),
        FOR_SALE(2, "판매 중"),
        SUSPENSION_OF_SALE(3, "판매 중지");
        @Getter
        private Integer code;
        @Getter
        private String status;

        ProductStatus(Integer code, String status) {
            this.code = code;
            this.status = status;
        }
    }

    public enum ShippingCountry {
        KOREA(1, "국내 배송"),
        FOREIGN_COUNTRY(2, "해외 배송");
        @Getter
        private Integer code;
        @Getter
        private String shippingType;

        ShippingCountry(Integer code, String shippingType) {
            this.code = code;
            this.shippingType = shippingType;
        }
    }

    public enum ShippingMethod {
        PARCEL_SERVICE(1, "택배"),
        INSTALLATION_SERVICE(2, "설치서비스");
        @Getter
        private Integer code;
        @Getter
        private String shippingMethod;

        ShippingMethod(Integer code, String shippingMethod) {
            this.code = code;
            this.shippingMethod = shippingMethod;
        }
    }

    public void addViewCount() {
        this.viewCount += 1;
    }

    public void calculateLikeCount(int likeCount) {
        this.likeCount += likeCount;
    }
}
