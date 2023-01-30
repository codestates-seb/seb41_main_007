package com.bzzzzz.farm.model.dto.review;


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

    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;


    public ReviewAnswerResponseDto(Long reviewAnswerId, String reviewAnswerTitle, String reviewAnswerContent, LocalDateTime createdAt, LocalDateTime modifiedAt,
                                   Long reviewId) {
        this.reviewAnswerId = reviewAnswerId;
        this.reviewAnswerTitle = reviewAnswerTitle;
        this.reviewAnswerContent = reviewAnswerContent;
        this.reviewId = reviewId;
        this.createdAt = createdAt;
        this.lastModifiedAt = modifiedAt;
    }
}
