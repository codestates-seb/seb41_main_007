package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Like;
import com.bzzzzz.farm.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByMember_MemberIdAndProduct(long memberId, Product product);
}
