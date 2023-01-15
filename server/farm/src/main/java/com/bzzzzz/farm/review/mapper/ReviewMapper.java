package com.bzzzzz.farm.review.mapper;


import com.bzzzzz.farm.review.dto.*;
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

    default List<ReviewSimpleResponseDto> reviewsToReviewSimpleResponseDtos(List<Review> reviews) {
        if ( reviews == null ) {
            return null;
        }

        return reviews.stream()
                .map(review -> reviewToReviewSimpleResponseDto(review))
                .collect(Collectors.toList());
    }

    private ReviewSimpleResponseDto reviewToReviewSimpleResponseDto(Review review) {
        if (review == null) {
            return null;
        }

        return ReviewSimpleResponseDto.builder()
                .reviewId(review.getReviewId())
                .reviewTitle(review.getReviewTitle())
                .reviewContent(review.getReviewContent())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .modifiedAt(review.getModifiedAt())
                .memberName(review.getMember().getName())
                .photo(review.getProduct().getPhoto())
                .build();
    }
}