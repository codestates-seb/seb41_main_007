package com.bzzzzz.farm.model.dto.review;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
@Validated
public class ReviewPatchDto {
    @Positive
    private Long reviewId;
    private Long memberId;
    private Long productId;
    private String reviewTitle;
    private String reviewContent;
    private float rating;
    private String reviewImage;

}