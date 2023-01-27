package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByMember_MemberIdAndProductOption(long memberId, ProductOption productOption);
    List<Cart> findAllByMember_MemberId(long memberId);
    Optional<Cart> findByMember_MemberIdAndProductOption_ProductOptionId(long memberId, long productOptionId);
}
