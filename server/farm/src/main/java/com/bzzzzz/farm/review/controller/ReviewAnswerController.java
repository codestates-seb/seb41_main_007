package com.bzzzzz.farm.review.controller;


import com.bzzzzz.farm.review.dto.ReviewDeleteDto;
import com.bzzzzz.farm.review.dto.reviewanswer.ReviewAnswerDeleteDto;
import com.bzzzzz.farm.review.dto.reviewanswer.ReviewAnswerPatchDto;
import com.bzzzzz.farm.review.dto.reviewanswer.ReviewAnswerPostDto;
import com.bzzzzz.farm.review.dto.reviewanswer.ReviewAnswerResponseDto;
import com.bzzzzz.farm.review.entity.ReviewAnswer;
import com.bzzzzz.farm.review.mapper.ReviewAnswerMapper;
import com.bzzzzz.farm.review.service.reviewanswer.ReviewAnswerService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@Log4j2
@RestController
@RequestMapping({"/reviews/answers"})
@Transactional
@Validated
public class ReviewAnswerController {

    private final ReviewAnswerService reviewAnswerService;
    private final ReviewAnswerMapper reviewAnswerMapper;

    public ReviewAnswerController(ReviewAnswerService reviewAnswerService, ReviewAnswerMapper reviewAnswerMapper) {
        this.reviewAnswerService = reviewAnswerService;
        this.reviewAnswerMapper = reviewAnswerMapper;
    }

    @PostMapping({""})
    public ResponseEntity insertReviewAnswer(@RequestBody @Valid ReviewAnswerPostDto reviewAnswerPostDto) {

        //TODO:작성자 Member 정보 가져오는 부분 넣어야함

        ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPostDtoToReviewAnswer(reviewAnswerPostDto);
        ReviewAnswer insertedReviewAnswer = reviewAnswerService.insertReviewAnswer(reviewAnswer);

        //TODO: review DB에 저장된 것 답변 등록된걸로 수정되도록 하기
        //Review updatedReview = reviewService.updateReview(review, member);

        //리뷰앤서리스폰스dto 생성
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(insertedReviewAnswer);

        return new ResponseEntity<>(reviewAnswerResponseDto,HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity updateReviewAnswer(@RequestBody @Valid ReviewAnswerPatchDto reviewAnswerPatchDto) {

        //TODO:작성자 Member 정보 가져오는 부분 넣어야함

        ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPatchDtoToReviewAnswer(reviewAnswerPatchDto);
        ReviewAnswer updatedReviewAnswer = reviewAnswerService.updateReviewAnswer(reviewAnswer);

        //리뷰앤서리스폰스dto 생성
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(updatedReviewAnswer);

        return new ResponseEntity<>(reviewAnswerResponseDto,HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteReviewAnswer(@RequestBody @Valid ReviewAnswerDeleteDto reviewAnswerDeleteDto) {
        //TODO: 관리자인지 검증하는 로직 추가
        //TODO: Review 테이블에서 답변 등록되어있던거 지우는 로직 추가해야함
        reviewAnswerService.deleteReviewAnswer(reviewAnswerDeleteDto.getReviewAnswerId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
