package com.bzzzzz.farm.model.entity;

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
    private String reviewImage;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productId", nullable = false)
    private Product product;



    //답변 매핑해야함
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reviewAnswerId")
    private ReviewAnswer reviewAnswer;

    public Review(String reviewTitle, String reviewContent, float rating, String reviewImage) {
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.reviewImage = reviewImage;
    }

    public Review(Long reviewId, String reviewTitle, String reviewContent, float rating, String reviewImage) {
        this.reviewId = reviewId;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.reviewImage = reviewImage;
    }
}