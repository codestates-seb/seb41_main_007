package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Like;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;

    @CacheEvict(value = "findProducts", allEntries = true)
    public void createLike(long memberId, Product product) {
        // 이미 좋아요를 눌렀는가 ?
        verifyExistsLike(memberId, product.getProductId());

        //좋아요 생성 및 저장
        Member member = new Member();
        member.setMemberId(memberId);
        likeRepository.save(new Like(null, member, product));
    }

    @CacheEvict(value = "findProducts", allEntries = true)
    public void deleteLike(long memberId, Product product) {
        // 좋아요를 누른적이 있는가 ?
        Like findLike = findVerifiedLike(memberId, product.getProductId());

        //좋아요 삭제
        likeRepository.delete(findLike);
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private void verifyExistsLike(long memberId, long productId) { // Like 생성시 사용
        Optional<Like> optionalLike = likeRepository.findByMember_MemberIdAndProduct_ProductId(memberId, productId);
        if (optionalLike.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.LIKE_EXISTS);
        }
    }

    @Transactional(readOnly = true)
    private Like findVerifiedLike(long memberId, long productId) { // Like 삭제시 사용
        Optional<Like> optionalLike = likeRepository.findByMember_MemberIdAndProduct_ProductId(memberId, productId);
        return optionalLike.orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public boolean isLiked(long memberId, long productId) {
        Optional<Like> optionalLike = likeRepository.findByMember_MemberIdAndProduct_ProductId(memberId, productId);
        if (optionalLike.isPresent()) {
            return true;
        }
        return false;
    }
}
