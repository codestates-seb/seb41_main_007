package com.bzzzzz.farm.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;

@Validated
@Getter
@Setter
@NoArgsConstructor
public class ReviewToReviewsResponseDto {
    private Long productId;
    private Long reviewId;
    private Long memberId;
    private String reviewTitle;
    private String reviewContent;
    private float rating;
    private String reviewCreatedAt;
    private String reviewLastModifiedAt;



    public ReviewToReviewsResponseDto(Long productId,Long reviewId, Long memberId, String reviewTitle, String reviewContent, float rating,LocalDateTime reviewCreatedAt, LocalDateTime reviewLastModifiedAt) {
        this.productId= productId;
        this.reviewId = reviewId;
        this.memberId = memberId;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.reviewCreatedAt = reviewCreatedAt.toString();
        this.reviewLastModifiedAt = reviewLastModifiedAt.toString();

    }

}
