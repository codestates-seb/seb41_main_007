package com.bzzzzz.farm.domain.review.entity;

import com.bzzzzz.farm.global.audit.Auditable;
import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.product.entity.Product;
import com.bzzzzz.farm.domain.review.entity.reviewanswer.ReviewAnswer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false)
    private String reviewTitle;

    @Lob
    @Column(nullable = false)
    private String reviewContent;

    @Column(nullable = false)
    private float rating;

    @Column
    private String picture;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    //이미지 매핑



    //답변 매핑해야함
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reviewAnswerId")
    private ReviewAnswer reviewAnswer;

    public Review(String reviewTitle, String reviewContent, float rating) {
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.rating = rating;
    }

    public Review(Long reviewId, String reviewTitle, String reviewContent, float rating) {
        this.reviewId = reviewId;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.rating = rating;
    }
}