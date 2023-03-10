package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findAllByMember_MemberId(long memberId);
    Optional<Cart> findByMember_MemberIdAndProductOption_ProductOptionId(long memberId, long productOptionId);
}
