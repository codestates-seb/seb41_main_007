package com.bzzzzz.farm.review.service;


import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.review.dto.ReviewPatchDto;
import com.bzzzzz.farm.review.entity.Review;
import com.bzzzzz.farm.review.repository.ReviewRepository;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

        return reviewRepository.findByProduct_ProductId(productId,pageable);
    }

    @Transactional(readOnly = true)
    public Review getProductReview(Long reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다."));
    }

    public Review updateReview(Review review, Member member){

        log.info("updateReview : "+review.getReviewId());
        //reviewId로 저장된 리뷰 불러오기
        Review findReview = findVerifiedReview(review.getReviewId());

        //글 작성 유저랑 수정하려는 유저 똑같은지 검증
        if (!findReview.getMember().getEmail().equals(member.getEmail())){
            throw new BusinessLogicException(ExceptionCode.INVALID_USER);
        }

        //리뷰 내용 업데이트 로직
        findReview.setReviewTitle(review.getReviewTitle());
        findReview.setReviewContent(review.getReviewContent());

        //TODO: 첨부파일 관련 로직 추가해야함

        return reviewRepository.save(findReview);

    }

    //특정 리뷰 삭제
    public void deleteReview(Long reviewId){
        Review findReview = findVerifiedReview(reviewId);
        reviewRepository.delete(findReview);
    }

    private Review findVerifiedReview(Long reviewId){
        Optional<Review> optionalReview = reviewRepository.findReviewByReviewId(reviewId);
        log.info("verifiedReview :"+ optionalReview.get().getReviewTitle());
        Review review = optionalReview
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        return review;
    }


    private Pageable createPageable(int page, int size) {
        return PageRequest.of(page, size);
    }
}