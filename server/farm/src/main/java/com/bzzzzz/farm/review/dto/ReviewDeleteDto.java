package com.bzzzzz.farm.review.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class ReviewDeleteDto {
    @Positive
    private Long reviewId;
}
