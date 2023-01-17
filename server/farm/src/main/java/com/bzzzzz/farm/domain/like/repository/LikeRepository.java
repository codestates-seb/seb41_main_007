package com.bzzzzz.farm.domain.like.repository;

import com.bzzzzz.farm.domain.like.entity.Like;
import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByMemberAndProduct(Member member, Product product);
}
