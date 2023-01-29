package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.MemberMapper;
import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.repository.AddressRepository;
import com.bzzzzz.farm.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;

    public MemberDto.Response updateMember(MemberDto.Patch request) throws ParseException {
        Member member = mapper.memberPatchToMember(request);

        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getBirth())
                .ifPresent(birth -> findMember.setBirth(birth));
        Optional.ofNullable(member.getGender())
                .ifPresent(gender -> findMember.setGender(gender));
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(phoneNumber -> findMember.setPhoneNumber(phoneNumber));

        memberRepository.save(findMember);

        return mapper.memberToMemberResponse(findMember);

    }

    @Transactional(readOnly = true)
    public MemberDto.Response findMember(long memberId) {
        return mapper.memberToMemberResponse(findVerifiedMember(memberId));
    }

    public List<MemberDto.Response> findMembers(){
        return mapper.membersToMemberResponses(memberRepository.findAll());
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }
    //로그인한 회원정보 가져오기
    public Member getLoginMember(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();  //SecurityContextHolder에서 회원정보 가져오기
        UserDetails userDetails = (UserDetails)principal;
        Optional<Member> optionalMember = memberRepository.findByEmail(userDetails.getUsername());

        if (optionalMember.isPresent()) return optionalMember.get();
        else throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
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