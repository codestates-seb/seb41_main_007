package com.bzzzzz.farm.review.service.reviewanswer;

import com.bzzzzz.farm.review.entity.ReviewAnswer;
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

}
