package com.bzzzzz.farm.review.dto;

import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@NoArgsConstructor
@Validated
public class ReviewPostDto {
    @Positive
    private Long memberId;
    private Long productId;
    private String reviewTitle;
    private String reviewContent;
    private float score;


}