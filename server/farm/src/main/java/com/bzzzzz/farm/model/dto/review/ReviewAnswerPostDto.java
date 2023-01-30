package com.bzzzzz.farm.model.dto.review;

import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Review;
import com.bzzzzz.farm.repository.ReviewRepository;
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
    private Long productId;
    private Long reviewId;
    private String reviewAnswerTitle;
    private String reviewAnswerContent;

    public Review getReview() {
        Review review = new Review();
        review.setReviewId(reviewId);
        return review;
    }
}
