package com.bzzzzz.farm.review.service;


import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.review.entity.Review;
import com.bzzzzz.farm.review.repository.ReviewRepository;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class ReviewService {

    private ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review insertReview(Review review) {
        Review saveReview = reviewRepository.save(review);
        return saveReview;
    }
}