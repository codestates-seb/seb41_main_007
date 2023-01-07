package com.bzzzzz.farm.review.controller;

import com.bzzzzz.farm.dto.MultiResponseDto;
import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.member.service.MemberService;
import com.bzzzzz.farm.product.entity.Product;
import com.bzzzzz.farm.product.repository.ProductRepository;
import com.bzzzzz.farm.review.dto.ReviewPostDto;
import com.bzzzzz.farm.review.dto.ReviewResponseDto;
import com.bzzzzz.farm.review.entity.Review;
import com.bzzzzz.farm.review.mapper.ReviewMapper;
import com.bzzzzz.farm.review.service.ReviewService;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


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

        //로그인한 유저 불러오는 방법 getLoginUser()로 불러옴
        Member member = memberService.getLoginMember();
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
                                                @RequestParam(defaultValue = "1") int page,
                                                @RequestParam(defaultValue = "10") int size) {
        Page<Review> reviewPage = reviewService.getProductReviewsList(productId, page -1, size);

        //현재 특정상품의 리뷰가 아닌 상품과 관계없이 진짜 전체 리뷰를 가져오도록 되어있어서 고쳐야함

        return new ResponseEntity(
                new MultiResponseDto<>(reviewMapper.reviewToReviewsResponseDto(reviewPage.getContent()), reviewPage),
                HttpStatus.OK);
    }



}