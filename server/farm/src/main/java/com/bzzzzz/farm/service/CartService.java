package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public Cart createCartProduct(long memberId, ProductOption productOption, int quantity) {
        Optional<Cart> optionalCart = cartRepository.findByMember_MemberIdAndProductOption(memberId, productOption);

        Member member = new Member();
        member.setMemberId(memberId);
        return optionalCart.isPresent()
                ? updateCart(optionalCart.get().getCartId(), quantity)
                : cartRepository.save(Cart
                .builder()
                .member(member)
                .productOption(productOption)
                .quantity(quantity)
                .build());
    }

    public Cart updateCart(long cartId, Integer quantity) {
        Cart findCart = findVerifiedCart(cartId);

        findCart.calculateQuantity(quantity); // 장바구니 수정항목이 추가 되면 옵셔널로 변경하시오

        if (findCart.getQuantity() <= 0) {
            findVerifiedCart(findCart.getCartId());
            return null;
        }
        return findCart;
    }

    @Transactional(readOnly = true)
    public List<Cart> findCartsByMemberId(long memberId) {
        return cartRepository.findAllByMember_MemberId(memberId);
    }

    public void deleteCart(long memberId, long productOptionId) {
        Cart findCart = findVerifiedCart(memberId, productOptionId);
        cartRepository.delete(findCart);
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private Cart findVerifiedCart(long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        return optionalCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    private Cart findVerifiedCart(long memberId, long productOptionId) {
        Optional<Cart> optionalCart = cartRepository.findByMember_MemberIdAndProductOption_ProductOptionId(memberId, productOptionId);
        return optionalCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CART_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public void verifyAuthority(long cartId, long memberId) {
        Cart cart = findVerifiedCart(cartId);
        if (cart.getMember().getMemberId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.REQUEST_FORBIDDEN);
        }
    }
}
