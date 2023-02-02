package com.bzzzzz.farm.repository.querydsl;

import com.bzzzzz.farm.model.dto.review.QReviewSimpleResponseDto;
import com.bzzzzz.farm.model.dto.review.ReviewSimpleResponseDto;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.bzzzzz.farm.model.entity.QReview.review;

@RequiredArgsConstructor
public class ReviewRepositoryCustomImpl implements ReviewRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<ReviewSimpleResponseDto> findSixRecentlyReviews() {
        return jpaQueryFactory
                .select(new QReviewSimpleResponseDto(
                        review.reviewId,
                        review.reviewTitle,
                        review.rating,
                        review.member.name,
                        review.reviewImage,
                        review.product.name,
                        review.createdAt,
                        review.modifiedAt
                ))
                .from(review)
                .orderBy(new OrderSpecifier(Order.DESC, review.reviewId))
                .limit(6)
                .fetch();
    }
}
