package com.bzzzzz.farm.review.service;


import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.review.entity.Review;
import com.bzzzzz.farm.review.repository.ReviewRepository;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    public Page<Review> getProductReviewsList(Long productId, int page, int size) {
        Pageable pageable = createPageable(page, size);
        log.info("pageable : " + pageable);
        log.info("pageable : " + pageable.getOffset());
        return reviewRepository.findByProduct_ProductId(productId,pageable);
        //return reviewRepository.findAllByProduct_ProductId(productId, pageable);
        //return reviewRepository.findAll(pageable);
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(page, size);
    }
}