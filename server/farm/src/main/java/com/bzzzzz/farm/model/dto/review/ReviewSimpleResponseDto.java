package com.bzzzzz.farm.model.dto.review;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReviewSimpleResponseDto {
    private Long reviewId;
    private String reviewTitle;
    private float rating;
    private String memberName;
    private String reviewImage;
    private String productName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    @QueryProjection
    public ReviewSimpleResponseDto(Long reviewId,
                                   String reviewTitle,
                                   float rating,
                                   String memberName,
                                   String reviewImage,
                                   String productName,
                                   LocalDateTime createdAt,
                                   LocalDateTime modifiedAt) {
        this.reviewId = reviewId;
        this.reviewTitle = reviewTitle;
        this.rating = rating;
        this.memberName = memberName;
        this.reviewImage = reviewImage;
        this.productName = productName;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
