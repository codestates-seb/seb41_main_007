package com.bzzzzz.farm.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ReviewAnswer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewAnswerId;

    @Column(nullable = false)
    private String reviewAnswerTitle;

    @Lob
    @Column(nullable = false)
    private String reviewAnswerContent;

    @OneToOne
    @JoinColumn(name = "reviewId")
    private Review review;

    public ReviewAnswer(Review review,String reviewAnswerTitle,String reviewAnswerContent) {
        this.review = review;
        this.reviewAnswerTitle = reviewAnswerTitle;
        this.reviewAnswerContent = reviewAnswerContent;
    }

}
