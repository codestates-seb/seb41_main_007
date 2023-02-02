package com.bzzzzz.farm.repository.querydsl;

import com.bzzzzz.farm.model.dto.review.ReviewSimpleResponseDto;

import java.util.List;

public interface ReviewRepositoryCustom {
    List<ReviewSimpleResponseDto> findSixRecentlyReviews();
}
