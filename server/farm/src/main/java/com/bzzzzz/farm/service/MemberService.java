package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.MemberMapper;
import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;

    public MemberDto.Response updateMember(MemberDto.Patch request) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");

        Member findMember = findVerifiedMember(request.getMemberId());
        Optional.ofNullable(request.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(request.getBirth())
                .ifPresent(birth -> {
                    try {
                        findMember.setBirth(formatter.parse(birth));
                    } catch (ParseException e) {
                        throw new BusinessLogicException(ExceptionCode.PARSE_EXCEPTION);
                    }
                });
        Optional.ofNullable(request.getGender())
                .ifPresent(gender -> findMember.setGender(gender));
        Optional.ofNullable(request.getPhoneNumber())
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