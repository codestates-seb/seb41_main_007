package com.bzzzzz.farm.domain.member.controller;


import com.bzzzzz.farm.domain.member.dto.MemberDto;
import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.member.mapper.MemberMapper;
import com.bzzzzz.farm.domain.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@Validated
@AllArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;


    //회원 정보 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody){
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    //본인 프로필 보기
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        return ResponseEntity.ok(mapper.memberToMemberResponse(memberService.findMember(memberId)));
    }

    //전체 회원 조회(관리자 전용)
    @GetMapping
    public ResponseEntity getMembers(){
        return ResponseEntity.ok(mapper.membersToMemberResponses(memberService.findMembers()));
    }

    //회원 탈퇴
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
        memberService.deleteMember(memberId);

        return ResponseEntity.ok().build();
    }

}
