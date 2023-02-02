package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.ReviewMapper;
import com.bzzzzz.farm.model.dto.MultiResponseDto;
import com.bzzzzz.farm.model.dto.review.ReviewPatchDto;
import com.bzzzzz.farm.model.dto.review.ReviewPostDto;
import com.bzzzzz.farm.model.dto.review.ReviewResponseDto;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.Review;
import com.bzzzzz.farm.repository.ProductRepository;
import com.bzzzzz.farm.service.MemberService;
import com.bzzzzz.farm.service.ProductService;
import com.bzzzzz.farm.service.ReviewService;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

import static com.bzzzzz.farm.common.Safety.toLong;

@Log4j2
@RestController
@Transactional
@Validated
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberService memberService;
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final ReviewMapper reviewMapper;

    public ReviewController(ReviewService reviewService, MemberService memberService, ProductRepository productRepository, ProductService productService, ReviewMapper reviewMapper) {
        this.reviewService = reviewService;
        this.memberService = memberService;
        this.productRepository = productRepository;
        this.productService = productService;
        this.reviewMapper = reviewMapper;
    }


    //리뷰등록
    @PostMapping("/reviews")
    public ResponseEntity insertReview(@RequestBody @Valid ReviewPostDto reviewPostDto, @AuthenticationPrincipal UserDetails userDetails) {
        Review review = reviewMapper.reviewPostDtoToReview(reviewPostDto);
        Product product = productService.findVerifiedProduct(reviewPostDto.getProductId());
        review.setProduct(product);
        Review insertReview = reviewService.insertReview(review, toLong(userDetails.getUsername()));
        ReviewResponseDto reviewResponseDto = reviewMapper.reviewToReviewResponseDto(insertReview);
        return new ResponseEntity(reviewResponseDto, HttpStatus.CREATED);
    }

    //특정 상품의 리뷰 전부 불러오기
    @GetMapping("/reviews")
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
    @GetMapping({"/reviews/{reviewId}"})
    public ResponseEntity getProductReview(@PathVariable Long reviewId) {
        Review review = reviewService.getProductReview(reviewId);
        ReviewResponseDto reviewResponseDto = reviewMapper.reviewToReviewResponseDto(review);
        return new ResponseEntity(reviewResponseDto, HttpStatus.OK);
    }


    //리뷰 수정하기
    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity updateReview(@RequestBody @Valid ReviewPatchDto reviewPatchDto, @PathVariable Long reviewId, @AuthenticationPrincipal UserDetails userDetails) {

        Review review = reviewMapper.reviewPatchDtoToReview(reviewPatchDto);

        Review updatedReview = reviewService.updateReview(reviewId, review, toLong(userDetails.getUsername()));

        ReviewResponseDto reviewResponseDto = reviewMapper.reviewToReviewResponseDto(updatedReview);

        return new ResponseEntity(reviewResponseDto, HttpStatus.OK);
    }

    //리뷰 삭제하기
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity deleteReview(@PathVariable String reviewId) {
        reviewService.deleteReview(Long.parseLong(reviewId));
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/reviews/all")
    public ResponseEntity getReviews() {
        return new ResponseEntity(reviewService.findReviewsOrderByReviewId(), HttpStatus.OK);
    }
}