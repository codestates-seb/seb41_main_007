package com.bzzzzz.farm.service;

import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Review;
import com.bzzzzz.farm.model.entity.ReviewAnswer;
import com.bzzzzz.farm.repository.MemberRepository;
import com.bzzzzz.farm.repository.ReviewAnswerRepository;
import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.repository.ReviewRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import static com.bzzzzz.farm.common.Safety.toLong;

@Service
@Log4j2
public class ReviewAnswerService {

    public ReviewAnswerService(ReviewAnswerRepository reviewAnswerRepository, MemberRepository memberRepository, ReviewRepository reviewRepository) {
        this.reviewAnswerRepository = reviewAnswerRepository;
        this.memberRepository = memberRepository;
        this.reviewRepository = reviewRepository;
    }

    private ReviewAnswerRepository reviewAnswerRepository;
    private MemberRepository memberRepository;
    private ReviewService reviewService;
    private ReviewRepository reviewRepository;


    public ReviewAnswer insertReviewAnswer(ReviewAnswer reviewAnswer) {
        ReviewAnswer saveReviewAnswer = reviewAnswerRepository.save(reviewAnswer);
        Review review = reviewRepository.findReviewByReviewId(saveReviewAnswer.getReview().getReviewId()).orElseThrow();
        review.setReviewAnswer(saveReviewAnswer);
        reviewRepository.save(review);

        return saveReviewAnswer;
    }

    public ReviewAnswer updateReviewAnswer(ReviewAnswer reviewAnswer) {
        ReviewAnswer findReviewAnswer = findVerifiedReviewAnswer(reviewAnswer.getReviewAnswerId());
        findReviewAnswer.setReviewAnswerTitle(reviewAnswer.getReviewAnswerTitle());
        findReviewAnswer.setReviewAnswerContent(reviewAnswer.getReviewAnswerContent());
        ReviewAnswer saveReviewAnswer = reviewAnswerRepository.save(findReviewAnswer);
        return saveReviewAnswer;
    }
    public void deleteReviewAnswer(Long reviewAnswerId) {
        ReviewAnswer findReviewAnswer = findVerifiedReviewAnswer(reviewAnswerId);
        Review findReview = reviewRepository.findReviewByReviewId(findReviewAnswer.getReview().getReviewId()).orElseThrow();
        findReview.setReviewAnswer(null);
        reviewRepository.save(findReview);
    }

    public ReviewAnswer findVerifiedReviewAnswer(Long reviewAnswerId) {
        return reviewAnswerRepository.findById(reviewAnswerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_ANSWER_NOT_FOUND));
    }
}
