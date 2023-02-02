package com.bzzzzz.farm.mapper;


import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Review;
import com.bzzzzz.farm.model.dto.review.*;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    default Review reviewPostDtoToReview(ReviewPostDto reviewPostDto) {
        if (reviewPostDto == null) {
            return null;
        } else {
            Review review = new Review(reviewPostDto.getReviewTitle(),
                    reviewPostDto.getReviewContent(),
                    reviewPostDto.getRating(),
                    reviewPostDto.getReviewImage());
            return review;
        }
    }

    default Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto) {
        if (reviewPatchDto == null) {
            return null;
        } else {
            Review review = new Review(
                    reviewPatchDto.getReviewId(),
                    reviewPatchDto.getReviewTitle(),
                    reviewPatchDto.getReviewContent(),
                    reviewPatchDto.getRating(),
                    reviewPatchDto.getReviewImage());
            return review;
        }
    }

    default ReviewResponseDto reviewToReviewResponseDto(Review review, Member member) {
        MemberDto.Response response = new MemberDto.Response();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        response.setMemberId(review.getMember().getMemberId());
        response.setName(review.getMember().getName());
        response.setEmail(review.getMember().getEmail());
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(phoneNumber -> response.setPhoneNumber(phoneNumber));
        Optional.ofNullable(member.getGender())
                .ifPresent(gender -> response.setGender(gender));
        Optional.ofNullable(member.getBirth())
                .ifPresent(birth -> response.setBirth(formatter.format(birth)));


        return review == null ? null : new ReviewResponseDto(review.getProduct().getProductId(),
                review.getReviewId(),
                response,
                review.getReviewTitle(),
                review.getReviewContent(),
                review.getRating(),
                review.getReviewImage(),
                review.getCreatedAt(),
                review.getModifiedAt());
    }

    default List<ReviewToReviewsResponseDto> reviewToReviewsResponseDto(List<Review> reviews) {

        return reviews.stream().map(review -> new ReviewToReviewsResponseDto(
                review.getProduct().getProductId(),
                review.getReviewId(),
                MemberDto.Response.builder()
                        .memberId(review.getMember().getMemberId())
                        .name(review.getMember().getName())
                        .build(),
                review.getReviewTitle(),
                review.getReviewContent(),
                review.getRating(),
                review.getReviewImage(),
                review.getCreatedAt(),
                review.getModifiedAt()
        )).collect(Collectors.toList());
    }
}