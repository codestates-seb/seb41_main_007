package com.bzzzzz.farm.controller;


import com.bzzzzz.farm.mapper.ReviewAnswerMapper;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerPatchDto;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerPostDto;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerResponseDto;
import com.bzzzzz.farm.model.entity.Review;
import com.bzzzzz.farm.model.entity.ReviewAnswer;
import com.bzzzzz.farm.service.MemberService;
import com.bzzzzz.farm.service.ReviewAnswerService;
import com.bzzzzz.farm.service.ReviewService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

import static com.bzzzzz.farm.common.Safety.toLong;

@Log4j2
@RestController
@Transactional
@Validated
public class ReviewAnswerController {

    private final ReviewAnswerService reviewAnswerService;
    private final ReviewAnswerMapper reviewAnswerMapper;

    private final MemberService memberService;
    private final ReviewService reviewService;

    public ReviewAnswerController(ReviewAnswerService reviewAnswerService, ReviewAnswerMapper reviewAnswerMapper, MemberService memberService, ReviewService reviewService) {
        this.reviewAnswerService = reviewAnswerService;
        this.reviewAnswerMapper = reviewAnswerMapper;
        this.memberService = memberService;
        this.reviewService = reviewService;
    }

    @PostMapping("/reviews/answers")
    public ResponseEntity insertReviewAnswer(@RequestBody @Valid ReviewAnswerPostDto reviewAnswerPostDto) {
        Review review = reviewService.getProductReview(reviewAnswerPostDto.getReviewId());
        ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPostDtoToReviewAnswer(reviewAnswerPostDto, review);
        ReviewAnswer insertedReviewAnswer = reviewAnswerService.insertReviewAnswer(reviewAnswer);
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(insertedReviewAnswer);
        return new ResponseEntity<>(reviewAnswerResponseDto, HttpStatus.CREATED);

    }

    @GetMapping("/reviews/answers/{reviewAnswerId}")
    public ResponseEntity getReviewAnswer(@PathVariable Long reviewAnswerId) {
        ReviewAnswer reviewAnswer = reviewAnswerService.findVerifiedReviewAnswer(reviewAnswerId);
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(reviewAnswer);
        return new ResponseEntity<>(reviewAnswerResponseDto, HttpStatus.OK);
    }



    @PatchMapping("/reviews/answers/{reviewAnswerId}")
    public ResponseEntity updateReviewAnswer(@RequestBody @Valid ReviewAnswerPatchDto reviewAnswerPatchDto, @PathVariable Long reviewAnswerId) {

        ReviewAnswer findReviewAnswer = reviewAnswerService.findVerifiedReviewAnswer(reviewAnswerId);
        ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPatchDtoToReviewAnswer(findReviewAnswer, reviewAnswerPatchDto, findReviewAnswer.getReview());
        ReviewAnswer updatedReviewAnswer = reviewAnswerService.updateReviewAnswer(reviewAnswer);

        //리뷰앤서리스폰스dto 생성
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(updatedReviewAnswer);

        return new ResponseEntity<>(reviewAnswerResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/reviews/answers/{reviewAnswerId}")
    public ResponseEntity deleteReviewAnswer(@PathVariable String reviewAnswerId) {
        reviewAnswerService.deleteReviewAnswer(toLong(reviewAnswerId));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
