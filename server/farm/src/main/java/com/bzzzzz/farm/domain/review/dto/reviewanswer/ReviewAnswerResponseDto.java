package com.bzzzzz.farm.domain.review.dto.reviewanswer;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;

@Validated
@Getter
@Setter
@NoArgsConstructor
public class ReviewAnswerResponseDto {
    private Long reviewAnswerId;
    private String reviewAnswerTitle;
    private String reviewAnswerContent;
    private Long reviewId;
    private Long productId;
    private Long memberId;

    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;


    public ReviewAnswerResponseDto(Long reviewAnswerId, String reviewAnswerTitle, String reviewAnswerContent, LocalDateTime createdAt, LocalDateTime modifiedAt,
                                   Long reviewId, Long memberId) {
        this.reviewAnswerId = reviewAnswerId;
        this.reviewAnswerTitle = reviewAnswerTitle;
        this.reviewAnswerContent = reviewAnswerContent;
        this.reviewId = reviewId;
        this.memberId = memberId;
    }
}
