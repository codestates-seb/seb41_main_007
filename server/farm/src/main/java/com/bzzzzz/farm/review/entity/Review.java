package com.bzzzzz.farm.review.entity;

import com.bzzzzz.farm.audit.Auditable;
import com.bzzzzz.farm.member.entity.Member;
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
    private float score;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    //product 추가로 매핑해야함

    //사진 추가로 매핑해야함

    //답변 매핑해야함

    public Review(String reviewTitle, String reviewContent, float score) {
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.score = score;
    }
}