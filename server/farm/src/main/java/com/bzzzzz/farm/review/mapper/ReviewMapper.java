package com.bzzzzz.farm.review.mapper;


import com.bzzzzz.farm.review.dto.ReviewPatchDto;
import com.bzzzzz.farm.review.dto.ReviewPostDto;
import com.bzzzzz.farm.review.dto.ReviewResponseDto;
import com.bzzzzz.farm.review.dto.ReviewToReviewsResponseDto;
import com.bzzzzz.farm.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    default Review reviewPostDtoToReview(ReviewPostDto reviewPostDto) {
        if (reviewPostDto == null) {
            return null;
        } else {
            Review review = new Review(reviewPostDto.getReviewTitle(),
                    reviewPostDto.getReviewContent(),
                    reviewPostDto.getRating());
            return review;
        }
    }

    default Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto) {
        if (reviewPatchDto == null) {
            return null;
        } else {
            Review review = new Review(
                    reviewPatchDto.getReviewId(),
                    reviewPatchDto.getReviewTitle(),
                    reviewPatchDto.getReviewContent(),
                    reviewPatchDto.getRating());
            return review;
        }
    }

    default ReviewResponseDto reviewToReviewResponseDto(Review review) {
        return review == null ? null : new ReviewResponseDto(review.getProduct().getProductId(),
                review.getReviewId(),
                review.getMember().getMemberId(),
                review.getReviewTitle(),
                review.getReviewContent(),
                review.getRating(),
                review.getCreatedAt(),
                review.getModifiedAt());
    }

    default List<ReviewToReviewsResponseDto> reviewToReviewsResponseDto(List<Review> reviews) {
        return reviews.stream().map(review -> new ReviewToReviewsResponseDto(
                review.getProduct().getProductId(),
                review.getReviewId(),
                review.getMember().getMemberId(),
                review.getReviewTitle(),
                review.getReviewContent(),
                review.getRating(),
                review.getCreatedAt(),
                review.getModifiedAt()
        )).collect(Collectors.toList());
    }

}