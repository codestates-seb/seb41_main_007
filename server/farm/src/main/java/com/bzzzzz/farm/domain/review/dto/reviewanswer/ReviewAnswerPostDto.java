package com.bzzzzz.farm.domain.review.dto.reviewanswer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
@Validated
public class ReviewAnswerPostDto {
    @Positive
    private Long memberId;
    private Long productId;
    private Long reviewId;
    private String reviewAnswerTitle;
    private String reviewAnswerContent;
}
