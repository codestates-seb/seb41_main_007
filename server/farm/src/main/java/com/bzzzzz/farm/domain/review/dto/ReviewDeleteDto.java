package com.bzzzzz.farm.domain.review.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class ReviewDeleteDto {
    @Positive
    private Long reviewId;
}
