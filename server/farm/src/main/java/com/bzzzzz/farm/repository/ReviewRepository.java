package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Review;
import com.bzzzzz.farm.repository.querydsl.ReviewRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {

    @Query("select r from Review r where r.product.productId = :productId")
    Page<Review> findByProduct_ProductId(Long productId, Pageable pageable);

    @Query("select r from Review r where r.reviewId = :reviewId")
    Optional<Review> findReviewByReviewId(@Param("reviewId") Long reviewId);
}