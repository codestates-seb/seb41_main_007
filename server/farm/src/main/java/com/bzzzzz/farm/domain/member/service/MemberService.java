package com.bzzzzz.farm.domain.member.service;

import com.bzzzzz.farm.global.security.utils.CustomAuthorityUtils;
import com.bzzzzz.farm.domain.cart.entiy.Cart;
import com.bzzzzz.farm.global.exception.BusinessLogicException;
import com.bzzzzz.farm.global.exception.ExceptionCode;
import com.bzzzzz.farm.global.helper.MemberRegistrationApplicationEvent;
import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getAge())
                .ifPresent(age -> findMember.setAge(age));
        Optional.ofNullable(member.getGender())
                .ifPresent(gender -> findMember.setGender(gender));
        Optional.ofNullable(member.getPhone())
                .ifPresent(phone -> findMember.setPhone(phone));
        Optional.ofNullable(member.getAddress())
                .ifPresent(address -> findMember.setAddress(address));
        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public List<Member> findMembers(){
        return memberRepository.findAll();
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }
    //로그인한 회원정보 가져오기
    public Member getLoginMember(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();  //SecurityContextHolder에서 회원정보 가져오기
        Optional<Member> optionalMember = memberRepository.findByEmail(principal.toString());
        if (optionalMember.isPresent()) return optionalMember.get();
        else return null;
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}