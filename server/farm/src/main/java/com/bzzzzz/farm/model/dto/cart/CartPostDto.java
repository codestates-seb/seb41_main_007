package com.bzzzzz.farm.model.dto.cart;

import com.bzzzzz.farm.model.entity.ProductOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CartPostDto {
//    @Positive
//    @Setter
//    private Long memberId;

    @Positive
    private Long productOptionId;

    @Positive
    private int quantity;

    // 편의 메서드
//    public Member getMember() {
//        Member member = new Member();
//        member.setMemberId(memberId);
//        return member;
//    }

    public ProductOption getProductOption() {
        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(productOptionId);
        return productOption;
    }
}
