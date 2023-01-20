package com.bzzzzz.farm.model.dto.review;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class ReviewAnswerDeleteDto {
    @Positive
    private Long reviewAnswerId;
}
