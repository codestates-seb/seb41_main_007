package com.bzzzzz.farm.review.service.reviewanswer;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.review.entity.reviewanswer.ReviewAnswer;
import com.bzzzzz.farm.review.repository.reviewAnswer.ReviewAnswerRepository;
import org.springframework.stereotype.Service;

@Service
public class ReviewAnswerService {

    private ReviewAnswerRepository reviewAnswerRepository;

    public ReviewAnswerService(ReviewAnswerRepository reviewAnswerRepository) {
        this.reviewAnswerRepository = reviewAnswerRepository;
    }

    public ReviewAnswer insertReviewAnswer(ReviewAnswer reviewAnswer) {
        return reviewAnswerRepository.save(reviewAnswer);
    }

    public ReviewAnswer updateReviewAnswer(ReviewAnswer reviewAnswer) {
        return reviewAnswerRepository.save(reviewAnswer);
    }
    public void deleteReviewAnswer(Long reviewAnswerId) {
        ReviewAnswer findReviewAnswer = findVerifiedReviewAnswer(reviewAnswerId);
        reviewAnswerRepository.delete(findReviewAnswer);
    }

    private ReviewAnswer findVerifiedReviewAnswer(Long reviewAnswerId) {
        return reviewAnswerRepository.findById(reviewAnswerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_ANSWER_NOT_FOUND));
    }
}
