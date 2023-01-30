package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.CartMapper;
import com.bzzzzz.farm.model.dto.cart.CartResponseDto;
import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.repository.CartRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CartServiceTest {
    @Mock
    private CartRepository cartRepository;
    @Mock
    private CartMapper cartMapper;
    @InjectMocks
    private CartService cartService;

    @Test
    @DisplayName("장바구니에 제품 담기-장바구니에 같은 제품이 없는 경우")
    void createCartProduct1() {
        // given
        long memberId = 1L;
        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(1L);
        int quantity = 5;

        Member member = new Member();
        member.setMemberId(memberId);
        Cart cart = Cart
                .builder()
                .member(member)
                .productOption(productOption)
                .quantity(quantity)
                .build();
        cart.setCartId(1L);

        given(cartRepository.findByMember_MemberIdAndProductOption_ProductOptionId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(null));
        given(cartRepository.save(Mockito.any(Cart.class))).willReturn(cart);

        // when
        Cart result = cartService.createCartProduct(memberId, productOption, quantity);

        // then
        verify(cartRepository, times(1)).save(Mockito.any(Cart.class));
        verify(cartRepository, times(1)).findByMember_MemberIdAndProductOption_ProductOptionId(Mockito.anyLong(), Mockito.anyLong());
        assertEquals(quantity, result.getQuantity());
    }

    @Test
    @DisplayName("장바구니에 제품 담기-장바구니에 같은 제품이 이미 있는 경우")
    void createCartProduct2() {
        // given
        long memberId = 1L;
        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(1L);
        int quantity = 5;

        Member member = new Member();
        member.setMemberId(memberId);
        Cart cart = Cart
                .builder()
                .member(member)
                .productOption(productOption)
                .quantity(5)
                .build();
        cart.setCartId(1L);

        given(cartRepository.findByMember_MemberIdAndProductOption_ProductOptionId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(cart));

        // when
        Cart result = cartService.createCartProduct(memberId, productOption, quantity);

        // then
        assertEquals(10, result.getQuantity());
    }

    @Test
    @DisplayName("장바구니에 담긴 제품 수량 수정-수정 후 0보다 큰경우")
    void updateCart1() {
        // given
        long memberId = 1L;
        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(1L);
        int quantity = 5;

        Member member = new Member();
        member.setMemberId(memberId);
        Cart cart = Cart
                .builder()
                .member(member)
                .productOption(productOption)
                .quantity(5)
                .build();
        cart.setCartId(1L);

        given(cartRepository.findByMember_MemberIdAndProductOption_ProductOptionId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(cart));

        // when
        Cart result = cartService.updateCart(memberId, productOption.getProductOptionId(), quantity);

        // then
        assertEquals(10, result.getQuantity());
    }

    @Test
    @DisplayName("장바구니에 담긴 제품 수량 수정-수정 후 0이하인 경우")
    void updateCart2() {
        // given
        long memberId = 1L;
        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(1L);
        int quantity = -5;

        Member member = new Member();
        member.setMemberId(memberId);
        Cart cart = Cart
                .builder()
                .member(member)
                .productOption(productOption)
                .quantity(5)
                .build();
        cart.setCartId(1L);

        given(cartRepository.findByMember_MemberIdAndProductOption_ProductOptionId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(cart));

        // when
        // then
        assertNull(cartService.updateCart(memberId, productOption.getProductOptionId(), quantity));
    }

    @Test
    @DisplayName("내 장바구니 보기")
    void findCartsByMemberId() {
        // given
        given(cartRepository.findAllByMember_MemberId(Mockito.anyLong())).willReturn(List.of());
        given(cartMapper.cartsToCartResponseDtos(Mockito.anyList())).willReturn(List.of());

        // when
        List<CartResponseDto> result = cartService.findCartsByMemberId(1L);

        // then
        assertEquals(List.of(), result);
    }

    @Test
    @DisplayName("장바구니에 담긴 제품 삭제하기-해피케이스")
    void deleteCart1() {
        // given
        Cart cart = new Cart();

        given(cartRepository.findByMember_MemberIdAndProductOption_ProductOptionId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(cart));
        doNothing().when(cartRepository).delete(Mockito.any(Cart.class));

        // when
        cartService.deleteCart(1L, 1L);

        // then
        verify(cartRepository).delete(cart);
    }

    @Test
    @DisplayName("장바구니에 담긴 제품 삭제하기-삭제하려는 대상이 존재하지 않는 경우")
    void deleteCart2() {
        // given
        given(cartRepository.findByMember_MemberIdAndProductOption_ProductOptionId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(null));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> cartService.deleteCart(1L, 1L));
        assertEquals(ExceptionCode.CART_NOT_FOUND, exception.getExceptionCode());
    }
}
