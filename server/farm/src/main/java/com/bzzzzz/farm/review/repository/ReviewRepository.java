package com.bzzzzz.farm.review.repository;

import com.bzzzzz.farm.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select r from Review r where r.product.productId = :productId")
    Page<Review> findByProduct_ProductId(Long productId, Pageable pageable);
}