package com.bzzzzz.farm.review.dto;


import org.springframework.validation.annotation.Validated;

@Validated
public class ReviewResponseDto {
    private Long reviewId;
    private Long memberId;
    private String content;

    public ReviewResponseDto(Long reviewId, Long memberId, String content) {
        this.reviewId = reviewId;
        this.memberId = memberId;
        this.content = content;
    }

    public Long getReviewId() {
        return this.reviewId;
    }

    public Long getMemberId() {
        return this.memberId;
    }

    public String getContent() {
        return this.content;
    }

    public void setReviewId(final Long reviewId) {
        this.reviewId = reviewId;
    }

    public void setMemberId(final Long memberId) {
        this.memberId = memberId;
    }

    public void setContent(final String content) {
        this.content = content;
    }

    public ReviewResponseDto() {
    }
}