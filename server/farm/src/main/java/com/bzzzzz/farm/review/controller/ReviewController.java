package com.bzzzzz.farm.review.controller;

import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.member.service.MemberService;
import com.bzzzzz.farm.review.dto.ReviewPostDto;
import com.bzzzzz.farm.review.dto.ReviewResponseDto;
import com.bzzzzz.farm.review.entity.Review;
import com.bzzzzz.farm.review.mapper.ReviewMapper;
import com.bzzzzz.farm.review.service.ReviewService;
import javax.transaction.Transactional;
import javax.validation.Valid;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Log4j2
@RestController
@RequestMapping({"/reviews"})
@Transactional
@Validated
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberService memberService;
    private final ReviewMapper reviewMapper;

    public ReviewController(ReviewService reviewService, MemberService memberService, ReviewMapper reviewMapper) {
        this.reviewService = reviewService;
        this.memberService = memberService;
        this.reviewMapper = reviewMapper;
    }

    //로그인한 유저 불러오는 방법 getLoginUser()로 불러오기
    @PostMapping({""})
    public ResponseEntity insertReview(@RequestBody @Valid ReviewPostDto reviewPostDto) {
        Review review = reviewMapper.reviewPostDtoToReview(reviewPostDto);
        Member member = memberService.getLoginMember();
        review.setMember(member);
        Review insertReview = reviewService.insertReview(review);

        log.info("log : " + reviewPostDto.getContent());
        ReviewResponseDto reviewResponseDto = reviewMapper.reviewToReviewResponseDto(insertReview);
        return new ResponseEntity(reviewResponseDto, HttpStatus.CREATED);
    }
}