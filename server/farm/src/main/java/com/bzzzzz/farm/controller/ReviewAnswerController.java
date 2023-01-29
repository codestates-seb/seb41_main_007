package com.bzzzzz.farm.controller;


import com.bzzzzz.farm.mapper.ReviewAnswerMapper;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerPatchDto;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerPostDto;
import com.bzzzzz.farm.model.dto.review.ReviewAnswerResponseDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.ReviewAnswer;
import com.bzzzzz.farm.service.MemberService;
import com.bzzzzz.farm.service.ReviewAnswerService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@Log4j2
@RestController
@Transactional
@Validated
public class ReviewAnswerController {

    private final ReviewAnswerService reviewAnswerService;
    private final ReviewAnswerMapper reviewAnswerMapper;

    private final MemberService memberService;

    public ReviewAnswerController(ReviewAnswerService reviewAnswerService, ReviewAnswerMapper reviewAnswerMapper, MemberService memberService) {
        this.reviewAnswerService = reviewAnswerService;
        this.reviewAnswerMapper = reviewAnswerMapper;
        this.memberService = memberService;
    }

    @PostMapping("/reviews/answers")
    public ResponseEntity insertReviewAnswer(@RequestBody @Valid ReviewAnswerPostDto reviewAnswerPostDto, @AuthenticationPrincipal UserDetails userDetails) {

        ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPostDtoToReviewAnswer(reviewAnswerPostDto);
        ReviewAnswer insertedReviewAnswer = reviewAnswerService.insertReviewAnswer(reviewAnswer, userDetails.getUsername());
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(insertedReviewAnswer);
        return new ResponseEntity<>(reviewAnswerResponseDto, HttpStatus.CREATED);

    }

    @PatchMapping("/reviews/answers")
    public ResponseEntity updateReviewAnswer(@RequestBody @Valid ReviewAnswerPatchDto reviewAnswerPatchDto, @AuthenticationPrincipal UserDetails userDetails) {


        ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPatchDtoToReviewAnswer(reviewAnswerPatchDto);
        ReviewAnswer updatedReviewAnswer = reviewAnswerService.updateReviewAnswer(reviewAnswer, userDetails.getUsername());

        //리뷰앤서리스폰스dto 생성
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(updatedReviewAnswer);

        return new ResponseEntity<>(reviewAnswerResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/reviews/answers/{reviewAnswerId}")
    public ResponseEntity deleteReviewAnswer(@PathVariable String reviewAnswerId) {
        reviewAnswerService.deleteReviewAnswer(Long.parseLong(reviewAnswerId));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
