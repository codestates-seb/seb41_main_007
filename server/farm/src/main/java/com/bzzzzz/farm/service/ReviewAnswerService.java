package com.bzzzzz.farm.service;

import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.ReviewAnswer;
import com.bzzzzz.farm.repository.MemberRepository;
import com.bzzzzz.farm.repository.ReviewAnswerRepository;
import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import org.springframework.stereotype.Service;

@Service
public class ReviewAnswerService {

    private ReviewAnswerRepository reviewAnswerRepository;
    private MemberRepository memberRepository;

    public ReviewAnswerService(ReviewAnswerRepository reviewAnswerRepository) {
        this.reviewAnswerRepository = reviewAnswerRepository;
    }

    public ReviewAnswer insertReviewAnswer(ReviewAnswer reviewAnswer, String username) {
        Member member = memberRepository.findByEmail(username).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        reviewAnswer.setMember(member);
        return reviewAnswerRepository.save(reviewAnswer);
    }

    public ReviewAnswer updateReviewAnswer(ReviewAnswer reviewAnswer, String username) {
        Member member = memberRepository.findByEmail(username).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        reviewAnswer.setMember(member);
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
