package com.bzzzzz.farm.mapper;


import com.bzzzzz.farm.model.dto.review.ReviewAnswerPatchDto;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerPostDto;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerResponseDto;
import com.bzzzzz.farm.model.entity.Review;
import com.bzzzzz.farm.model.entity.ReviewAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewAnswerMapper {
    default ReviewAnswer reviewAnswerPostDtoToReviewAnswer(ReviewAnswerPostDto reviewAnswerPostDto, Review review) {
        if (reviewAnswerPostDto == null) {
            return null;
        } else {
            ReviewAnswer reviewAnswer = new ReviewAnswer(
                    review,
                    reviewAnswerPostDto.getReviewAnswerTitle(),
                    reviewAnswerPostDto.getReviewAnswerContent()
            );
            return reviewAnswer;
        }
    }
    default ReviewAnswerResponseDto reviewAnswerToReviewAnswerResponseDto(ReviewAnswer reviewAnswer) {
        if (reviewAnswer == null) {
            return null;
        } else {
            ReviewAnswerResponseDto reviewAnswerResponseDto = new ReviewAnswerResponseDto(reviewAnswer.getReviewAnswerId(),
                    reviewAnswer.getReviewAnswerTitle(),
                    reviewAnswer.getReviewAnswerContent(),
                    reviewAnswer.getCreatedAt(),
                    reviewAnswer.getModifiedAt(),
                    reviewAnswer.getReview().getReviewId()
            );
            return reviewAnswerResponseDto;
        }
    }
    default ReviewAnswer reviewAnswerPatchDtoToReviewAnswer(ReviewAnswer findReviewAnswer,ReviewAnswerPatchDto reviewAnswerPatchDto, Review review) {
        if (reviewAnswerPatchDto == null) {
            return null;
        } else {
            ReviewAnswer reviewAnswer = new ReviewAnswer(
                    findReviewAnswer.getReviewAnswerId(),
                    review,
                    reviewAnswerPatchDto.getReviewAnswerTitle(),
                    reviewAnswerPatchDto.getReviewAnswerContent()
            );
            return reviewAnswer;
        }
    }
}

