package com.bzzzzz.farm.review.controller;


import com.bzzzzz.farm.review.dto.reviewanswer.ReviewAnswerPostDto;
import com.bzzzzz.farm.review.dto.reviewanswer.ReviewAnswerResponseDto;
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

    @PostMapping({""})
    public ResponseEntity insertReviewAnswer(@RequestBody @Valid ReviewAnswerPostDto reviewAnswerPostDto) {



        //리뷰앤서리스폰스dto 생성
        ReviewAnswerResponseDto reviewAnswerResponseDto = new ReviewAnswerResponseDto();

        return new ResponseEntity<>(reviewAnswerResponseDto,HttpStatus.CREATED);
    }
}
