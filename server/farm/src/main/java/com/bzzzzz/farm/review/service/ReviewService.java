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

    public Review insertReview(Review review,Long memberId, String name) {
        log.info("insertReview :"+name);
        Member member = new Member(memberId,"test",name,1,"test@gmail.com",false,"male","01011111111");
        //Member가 없어서 임시로 넣음
        //review.setMember(member);
        Review saveReview = reviewRepository.save(review);
        return saveReview;
    }
}