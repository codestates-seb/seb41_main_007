package com.bzzzzz.farm.service;

import com.bzzzzz.farm.model.entity.Like;
import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.repository.LikeRepository;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Product;
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
    private final ProductService productService;

    @CacheEvict(value = "getMain", allEntries = true)
    public void createLike(long memberId, long productId) {
        //Todo: 멤버들어오면 멤버유효성 검증을 통해 찾은 멤버로 수정해야함
        Member member = new Member();
        member.setMemberId(memberId);

        // Product 유효성 검증
        Product product = productService.findVerifiedProduct(productId);

        // 이미 좋아요를 눌렀는가 ?
        verifyExistsLike(member, product);

        //좋아요 생성 및 저장
        likeRepository.save(new Like(null, member, product));
    }

    @CacheEvict(value = "getMain", allEntries = true)
    public void deleteLike(long memberId, long productId) {
        //Todo: 멤버들어오면 멤버유효성 검증을 통해 찾은 멤버로 수정해야함
        Member member = new Member();
        member.setMemberId(memberId);

        // Product 유효성 검증
        Product product = productService.findVerifiedProduct(productId);

        // 좋아요를 누른적이 있는가 ?
        Like findLike = findVerifiedLike(member, product);

        //좋아요 삭제
        likeRepository.delete(findLike);
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private void verifyExistsLike(Member member, Product product) { // Like 생성시 사용
        Optional<Like> optionalLike = likeRepository.findByMemberAndProduct(member, product);
        if (optionalLike.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.LIKE_EXISTS);
        }
    }

    @Transactional(readOnly = true)
    private Like findVerifiedLike(Member member, Product product) { // Like 삭제시 사용
        Optional<Like> optionalLike = likeRepository.findByMemberAndProduct(member, product);
        return optionalLike.orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Boolean isLiked(Member member, Product product) {
        Optional<Like> optionalLike = likeRepository.findByMemberAndProduct(member, product);
        if (optionalLike.isPresent()) {
            return true;
        }
        return false;
    }
}
