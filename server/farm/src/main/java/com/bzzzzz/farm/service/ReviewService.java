package com.bzzzzz.farm.service;


import com.bzzzzz.farm.repository.MemberRepository;
import com.bzzzzz.farm.repository.ReviewRepository;
import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Review;
import lombok.extern.log4j.Log4j2;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
public class ReviewService {

    private ReviewRepository reviewRepository;
    private MemberService memberService;
    private MemberRepository memberRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @CacheEvict(value = "findReviewsOrderByReviewId", allEntries = true)
    public Review insertReview(Review review, Long userId) {
        Member member = new Member();
        member.setMemberId(userId);
        review.setMember(member);
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

    @CacheEvict(value = "findReviewsOrderByReviewId", allEntries = true)
    public Review updateReview(Long reviewId, Review review, Long userId) {

        log.info("updateReview : "+review.getReviewId());
        //reviewId로 저장된 리뷰 불러오기
        Review findReview = findVerifiedReview(reviewId);
        Member member = new Member();
        member.setMemberId(userId);
        //리뷰 내용 업데이트 로직
        findReview.setReviewTitle(review.getReviewTitle());
        findReview.setReviewContent(review.getReviewContent());
        findReview.setRating(review.getRating());
        findReview.setReviewImage(review.getReviewImage());
        return reviewRepository.save(findReview);

    }

    //특정 리뷰 삭제
    @CacheEvict(value = "findReviewsOrderByReviewId", allEntries = true)
    public void deleteReview(Long reviewId){
        Review findReview = findVerifiedReview(reviewId);
        reviewRepository.delete(findReview);
    }

    public Review findVerifiedReview(Long reviewId){
        Optional<Review> optionalReview = reviewRepository.findReviewByReviewId(reviewId);
        log.info("verifiedReview :"+ optionalReview.get().getReviewTitle());
        Review review = optionalReview
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        return review;
    }


    private Pageable createPageable(int page, int size) {
        return PageRequest.of(page, size);
    }

    @Cacheable(value = "findReviewsOrderByReviewId")
    @Transactional(readOnly = true)
    public List<Review> findReviewsOrderByReviewId() { // 메인페이지에 하단부에 사용
        return reviewRepository.findAll(PageRequest.of(0, 4, Sort.by("reviewId").descending())).getContent();
    }
}