package com.bzzzzz.farm.like.repository;

import com.bzzzzz.farm.like.entity.Like;
import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByMemberAndProduct(Member member, Product product);
}
