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
public class ReviewPostDto {
    @Positive
    private Long memberId;
    private Long productId;
    private String reviewTitle;
    private String reviewContent;
    private float rating;
    //리뷰 s3 이미지 링크들 string으로 넣어줌
    private String reviewImage;

}