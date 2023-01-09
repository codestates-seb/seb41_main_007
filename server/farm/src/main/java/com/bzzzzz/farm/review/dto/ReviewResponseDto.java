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
public class ReviewResponseDto {

    private Long productId;
    private Long reviewId;
    private Long memberId;
    private String reviewTitle;
    private String reviewContent;

    private float rating;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;

    public ReviewResponseDto(Long productId,Long reviewId, Long memberId, String reviewTitle,String reviewContent, float rating,LocalDateTime createdAt, LocalDateTime lastModifiedAt) {
        this.productId= productId;
        this.reviewId = reviewId;
        this.memberId = memberId;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.createdAt = createdAt;
        this.lastModifiedAt = lastModifiedAt;
    }

}