package com.bzzzzz.farm.model.dto.review;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReviewSimpleResponseDto {
    private Long reviewId;
    private String reviewTitle;
    private String reviewContent;
    private float rating;
    private String memberName;
    private String reviewImage;
    private Long productId;
    private LocalDateTime createdAt;

    @QueryProjection
    public ReviewSimpleResponseDto(Long reviewId,
                                   String reviewTitle,
                                   String reviewContent,
                                   float rating,
                                   String memberName,
                                   String reviewImage,
                                   Long productId,
                                   LocalDateTime createdAt) {
        this.reviewId = reviewId;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.rating = rating;
        this.memberName = memberName;
        this.reviewImage = reviewImage;
        this.productId = productId;
        this.createdAt = createdAt;
    }
}
