package com.bzzzzz.farm.review.repository;

import com.bzzzzz.farm.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    //JPQL로 특정 상품 리뷰 리스트만 가져오도록 해야함
}