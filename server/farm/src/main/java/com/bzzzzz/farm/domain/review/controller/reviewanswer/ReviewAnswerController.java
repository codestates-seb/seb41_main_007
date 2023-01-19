package com.bzzzzz.farm.domain.review.controller.reviewanswer;


import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.member.service.MemberService;
import com.bzzzzz.farm.domain.review.dto.reviewanswer.ReviewAnswerDeleteDto;
import com.bzzzzz.farm.domain.review.dto.reviewanswer.ReviewAnswerPatchDto;
import com.bzzzzz.farm.domain.review.dto.reviewanswer.ReviewAnswerPostDto;
import com.bzzzzz.farm.domain.review.dto.reviewanswer.ReviewAnswerResponseDto;
import com.bzzzzz.farm.domain.review.entity.reviewanswer.ReviewAnswer;
import com.bzzzzz.farm.domain.review.mapper.reviewanswer.ReviewAnswerMapper;
import com.bzzzzz.farm.domain.review.service.reviewanswer.ReviewAnswerService;
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

    private final MemberService memberService;

    public ReviewAnswerController(ReviewAnswerService reviewAnswerService, ReviewAnswerMapper reviewAnswerMapper, MemberService memberService) {
        this.reviewAnswerService = reviewAnswerService;
        this.reviewAnswerMapper = reviewAnswerMapper;
        this.memberService = memberService;
    }

    @PostMapping({""})
    public ResponseEntity insertReviewAnswer(@RequestBody @Valid ReviewAnswerPostDto reviewAnswerPostDto) {

        Member member = memberService.getLoginMember();
        if(member.getRoles().equals("ROLE_ADMIN")){
            ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPostDtoToReviewAnswer(reviewAnswerPostDto);
            reviewAnswer.setMember(member);
            ReviewAnswer insertedReviewAnswer = reviewAnswerService.insertReviewAnswer(reviewAnswer);
            ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(insertedReviewAnswer);
            return new ResponseEntity<>(reviewAnswerResponseDto,HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

    @PatchMapping
    public ResponseEntity updateReviewAnswer(@RequestBody @Valid ReviewAnswerPatchDto reviewAnswerPatchDto) {

        Member member = memberService.getLoginMember();

        ReviewAnswer reviewAnswer = reviewAnswerMapper.reviewAnswerPatchDtoToReviewAnswer(reviewAnswerPatchDto);
        reviewAnswer.setMember(member);
        ReviewAnswer updatedReviewAnswer = reviewAnswerService.updateReviewAnswer(reviewAnswer);

        //리뷰앤서리스폰스dto 생성
        ReviewAnswerResponseDto reviewAnswerResponseDto = reviewAnswerMapper.reviewAnswerToReviewAnswerResponseDto(updatedReviewAnswer);

        return new ResponseEntity<>(reviewAnswerResponseDto,HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteReviewAnswer(@RequestBody @Valid ReviewAnswerDeleteDto reviewAnswerDeleteDto) {
        Member member = memberService.getLoginMember();
        if(member.getRoles().equals("ROLE_ADMIN")) {
            reviewAnswerService.deleteReviewAnswer(reviewAnswerDeleteDto.getReviewAnswerId());
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }
}