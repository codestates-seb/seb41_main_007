package com.bzzzzz.farm.member.service;

import com.bzzzzz.farm.auth.utils.CustomAuthorityUtils;
import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.helper.event.MemberRegistrationApplicationEvent;
import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());  //패스워드 인코딩
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(this,savedMember));
        return savedMember;
    }
    public Member updateMember(Member member){
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getPassword())
                .ifPresent(pw -> findMember.setPassword(encryptedPassword));
        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getAge())
                .ifPresent(age -> findMember.setAge(age));
        Optional.ofNullable(member.isCertification())
                .ifPresent(certification -> findMember.setCertification(certification));
        Optional.ofNullable(member.getGender())
                .ifPresent(gender -> findMember.setGender(gender));
        Optional.ofNullable(member.getPhone())
                .ifPresent(phone -> findMember.setPhone(phone));


        return memberRepository.save(findMember);
    }
    public Member findMember(long memberId){
        return findVerifiedMember(memberId);
    }
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }
    public void deleteMember(long memberId){
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
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
