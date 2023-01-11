package com.bzzzzz.farm.review.controller;


import com.bzzzzz.farm.review.dto.reviewanswer.ReviewAnswerPostDto;
import com.bzzzzz.farm.review.dto.reviewanswer.ReviewAnswerResponseDto;
import com.bzzzzz.farm.review.entity.ReviewAnswer;
import com.bzzzzz.farm.review.mapper.ReviewAnswerMapper;
import com.bzzzzz.farm.review.service.reviewanswer.ReviewAnswerService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

        //작성자 Member 정보 가져오는 부분 넣어야함

        ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPostDtoToReviewAnswer(reviewAnswerPostDto);
        ReviewAnswer insertedReviewAnswer = reviewAnswerService.insertReviewAnswer(reviewAnswer);

        //TODO: review DB에 저장된 것 답변 등록된걸로 수정되도록 하기
        //Review updatedReview = reviewService.updateReview(review, member);

        //리뷰앤서리스폰스dto 생성
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(insertedReviewAnswer);

        return new ResponseEntity<>(reviewAnswerResponseDto,HttpStatus.CREATED);
    }
}
