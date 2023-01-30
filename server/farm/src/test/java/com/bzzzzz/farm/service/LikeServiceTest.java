package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Like;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.repository.LikeRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LikeServiceTest {
    @Mock
    private LikeRepository likeRepository;
    @InjectMocks
    private LikeService likeService;

    @Test
    @DisplayName("좋아요 누르기- 해피케이스")
    void createLike1() {
        // given
        Member member = new Member();
        member.setMemberId(1L);
        Product product = new Product();
        product.setProductId(1L);

        Like like = new Like(null, member, product);

        given(likeRepository.findByMember_MemberIdAndProduct_ProductId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(null));
        given(likeRepository.save(Mockito.any(Like.class))).willReturn(like);
        // when
        likeService.createLike(member.getMemberId(), product);

        // then
        verify(likeRepository, times(1)).save(Mockito.any(Like.class));
    }

    @Test
    @DisplayName("좋아요 누르기- 이미 좋아요를 누른 경우")
    void createLike2() {
        // given
        Member member = new Member();
        member.setMemberId(1L);
        Product product = new Product();
        product.setProductId(1L);

        Like like = new Like(1L, member, product);

        given(likeRepository.findByMember_MemberIdAndProduct_ProductId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(like));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> likeService.createLike(member.getMemberId(), product));
        assertEquals(ExceptionCode.LIKE_EXISTS, exception.getExceptionCode());
    }

    @Test
    @DisplayName("좋아요 취소하기-해피케이스")
    void deleteLike1() {
        // given
        Member member = new Member();
        member.setMemberId(1L);
        Product product = new Product();
        product.setProductId(1L);

        Like like = new Like(1L, member, product);

        given(likeRepository.findByMember_MemberIdAndProduct_ProductId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(like));
        doNothing().when(likeRepository).delete(Mockito.any(Like.class));

        // when
        likeService.deleteLike(member.getMemberId(), product);

        // then
        verify(likeRepository, times(1)).delete(Mockito.any(Like.class));
    }

    @Test
    @DisplayName("좋아요 취소하기-좋아요를 누른적이 없는 경우")
    void deleteLike2() {
        // given
        Member member = new Member();
        member.setMemberId(1L);
        Product product = new Product();
        product.setProductId(1L);

        given(likeRepository.findByMember_MemberIdAndProduct_ProductId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(null));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> likeService.deleteLike(member.getMemberId(), product));
        assertEquals(ExceptionCode.LIKE_NOT_FOUND, exception.getExceptionCode());
    }

    @Test
    @DisplayName("좋아요를 누른적이 있는가?-있는 경우")
    void isLiked1() {
        // given
        given(likeRepository.findByMember_MemberIdAndProduct_ProductId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(new Like()));

        // when
        // then
        assertTrue(likeService.isLiked(1L, 1L));
    }

    @Test
    @DisplayName("좋아요를 누른적이 있는가?-없는 경우")
    void isLiked2() {
        // given
        given(likeRepository.findByMember_MemberIdAndProduct_ProductId(Mockito.anyLong(), Mockito.anyLong())).willReturn(Optional.ofNullable(null));

        // when
        // then
        assertFalse(likeService.isLiked(1L, 1L));
    }
}
