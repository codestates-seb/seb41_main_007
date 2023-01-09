package com.bzzzzz.farm.like.service;

import com.bzzzzz.farm.like.entity.Like;
import com.bzzzzz.farm.like.repository.LikeRepository;
import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.product.entity.Product;
import com.bzzzzz.farm.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final ProductService productService;

    public void createLike(long memberId, long productId) {
        //Todo: 멤버들어오면 멤버유효성 검증을 통해 찾은 멤버로 수정해야함
        Member member = new Member();
        member.setMemberId(memberId);

        // Product 유효성 검증
        Product product = productService.findVerifiedProduct(productId);

        // 이미 좋아요를 눌렀는가 ?
        verifyExistsLike(member, product);

        // Product 의 좋아요 수 1개 증가
        product.calculateLikeCount(1);

        //좋아요 생성 및 저장
        likeRepository.save(new Like(null, member, product));
    }

    public void deleteLike(long memberId, long productId) {
        //Todo: 멤버들어오면 멤버유효성 검증을 통해 찾은 멤버로 수정해야함
        Member member = new Member();
        member.setMemberId(memberId);

        // Product 유효성 검증
        Product product = productService.findVerifiedProduct(productId);

        // 좋아요를 누른적이 있는가 ?
        Like findLike = findVerifiedLike(member, product);

        // Product 의 좋아요 수 1개 감소
        product.calculateLikeCount(-1);

        //좋아요 삭제
        likeRepository.delete(findLike);
    }

    @Transactional(readOnly = true)
    private void verifyExistsLike(Member member, Product product) { // Like 생성시 사용
        Optional<Like> optionalLike = likeRepository.findByMemberAndProduct(member, product);
        if (optionalLike.isPresent()) {
            throw new RuntimeException("LIKE_EXISTS"); //FiXME 병수님 예외코드 들어오면 고칠 것
        }
    }

    @Transactional(readOnly = true)
    private Like findVerifiedLike(Member member, Product product) { // Like 삭제시 사용
        Optional<Like> optionalLike = likeRepository.findByMemberAndProduct(member, product);
        return optionalLike.orElseThrow(() -> new RuntimeException("LIKE_NOT_FOUND")); //FiXME 병수님 예외코드 들어오면 고칠 것
    }
}
