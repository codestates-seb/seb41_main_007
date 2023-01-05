package com.bzzzzz.farm.review.mapper;


import com.bzzzzz.farm.review.dto.ReviewPostDto;
import com.bzzzzz.farm.review.dto.ReviewResponseDto;
import com.bzzzzz.farm.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ReviewMapper {
    default Review reviewPostDtoToReview(ReviewPostDto reviewPostDto) {
        if (reviewPostDto == null) {
            return null;
        } else {
            Review review = new Review(reviewPostDto.getContent());
            return review;
        }
    }

    default ReviewResponseDto reviewToReviewResponseDto(Review review) {
        //memberID 예시 반환하는걸로 고쳐야 동작함
        return review == null ? null : new ReviewResponseDto(review.getReviewId(), review.getMember().getMemberId(), review.getContent());
    }
}