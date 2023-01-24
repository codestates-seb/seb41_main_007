package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.ReviewMapper;
import com.bzzzzz.farm.service.ReviewService;
import com.bzzzzz.farm.model.dto.MultiResponseDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.service.MemberService;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.repository.ProductRepository;
import com.bzzzzz.farm.model.dto.review.ReviewDeleteDto;
import com.bzzzzz.farm.model.dto.review.ReviewPatchDto;
import com.bzzzzz.farm.model.dto.review.ReviewPostDto;
import com.bzzzzz.farm.model.dto.review.ReviewResponseDto;
import com.bzzzzz.farm.model.entity.Review;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;


@Log4j2
@RestController
@RequestMapping({"/reviews"})
@Transactional
@Validated
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberService memberService;
    private final ProductRepository productRepository;
    private final ReviewMapper reviewMapper;

    public ReviewController(ReviewService reviewService, MemberService memberService, ProductRepository productRepository, ReviewMapper reviewMapper) {
        this.reviewService = reviewService;
        this.memberService = memberService;
        this.productRepository = productRepository;
        this.reviewMapper = reviewMapper;
    }


    //리뷰등록
    @PostMapping({""})
    public ResponseEntity insertReview(@RequestBody @Valid ReviewPostDto reviewPostDto) {
        Review review = reviewMapper.reviewPostDtoToReview(reviewPostDto);

        Member member = memberService.getLoginMember();
        log.info("로그인한 유저 체크: " + member.getEmail());
        review.setMember(member);

        Product product = productRepository.findById(reviewPostDto.getProductId()).orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다."));
        review.setProduct(product);
        Review insertReview = reviewService.insertReview(review);

        //작성한 게시글 제목 로그 띄우기
        log.info("log : " + reviewPostDto.getReviewTitle());

        ReviewResponseDto reviewResponseDto = reviewMapper.reviewToReviewResponseDto(insertReview);
        return new ResponseEntity(reviewResponseDto, HttpStatus.CREATED);
    }

    //특정 상품의 리뷰 전부 불러오기
    @GetMapping({""})
    public ResponseEntity getProductReviewsList(@Positive @RequestParam Long productId,
                                                @RequestParam(required = false, defaultValue = "1") int page,
                                                @RequestParam(required = false, defaultValue = "10") int size) {

        Page<Review> reviewPage = reviewService.getProductReviewsList(productId, page - 1, size);

        return new ResponseEntity(
                new MultiResponseDto<>(reviewMapper.reviewToReviewsResponseDto(reviewPage.getContent()), reviewPage),
                HttpStatus.OK
        );
    }

    //특정상품의 특정 리뷰 하나 가져오기
    @GetMapping({"/{reviewId}"})
    public ResponseEntity getProductReview(@PathVariable Long reviewId) {
        Review review = reviewService.getProductReview(reviewId);
        ReviewResponseDto reviewResponseDto = reviewMapper.reviewToReviewResponseDto(review);
        return new ResponseEntity(reviewResponseDto, HttpStatus.OK);
    }


    //리뷰 수정하기
    @PatchMapping
    public ResponseEntity patchReview(@RequestBody @Valid ReviewPatchDto reviewPatchDto) {

        Review review = reviewMapper.reviewPatchDtoToReview(reviewPatchDto);
        Member member = memberService.getLoginMember();

        Review updatedReview = reviewService.updateReview(review, member);

        ReviewResponseDto reviewResponseDto = reviewMapper.reviewToReviewResponseDto(updatedReview);

        return new ResponseEntity(reviewResponseDto, HttpStatus.OK);
    }

    //리뷰 삭제하기
    @DeleteMapping
    public ResponseEntity deleteReview(@RequestBody @Valid ReviewDeleteDto reviewDeleteDto) {


        Member member = memberService.getLoginMember();

        if (member.getRoles().contains("ROLE_ADMIN")) {
            reviewService.deleteReview(reviewDeleteDto.getReviewId());
        } else {
            throw new IllegalArgumentException("관리자만 삭제가 가능합니다.");
        }


        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}