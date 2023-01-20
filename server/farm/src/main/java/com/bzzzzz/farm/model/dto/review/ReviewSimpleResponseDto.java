package com.bzzzzz.farm.model.dto.review;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewSimpleResponseDto {
    private Long reviewId;
    private String reviewTitle;
    private String reviewContent;
    private float rating;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String memberName;
    private String photo;
}
