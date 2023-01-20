package com.bzzzzz.farm.mapper;


import com.bzzzzz.farm.model.dto.review.ReviewAnswerPatchDto;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerPostDto;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerResponseDto;
import com.bzzzzz.farm.model.entity.ReviewAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewAnswerMapper {
    default ReviewAnswer reviewAnswerPostDtoToReviewAnswer(ReviewAnswerPostDto reviewAnswerPostDto) {
        if (reviewAnswerPostDto == null) {
            return null;
        } else {
            ReviewAnswer reviewAnswer = new ReviewAnswer(reviewAnswerPostDto.getReviewAnswerTitle(),reviewAnswerPostDto.getReviewAnswerContent());
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
                    reviewAnswer.getReview().getReviewId(),
                    reviewAnswer.getMember().getMemberId()
            );
            return reviewAnswerResponseDto;
        }
    }
    default ReviewAnswer reviewAnswerPatchDtoToReviewAnswer(ReviewAnswerPatchDto reviewAnswerPatchDto) {
        if (reviewAnswerPatchDto == null) {
            return null;
        } else {
            ReviewAnswer reviewAnswer = new ReviewAnswer(reviewAnswerPatchDto.getReviewAnswerTitle(),reviewAnswerPatchDto.getReviewAnswerContent());
            return reviewAnswer;
        }
    }
}

