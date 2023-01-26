package com.bzzzzz.farm.controller;


import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.mapper.MemberMapper;
import com.bzzzzz.farm.service.MemberService;
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
    @PatchMapping
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch requestBody){
        requestBody.setMemberId(memberService.getLoginMember().getMemberId());
        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    //본인 프로필 보기
    @GetMapping
    public ResponseEntity getMember(){
        return ResponseEntity.ok(mapper.memberToMemberResponse
                (memberService.findMember(memberService.getLoginMember().getMemberId())));
    }

    //전체 회원 조회(관리자 전용)
    @GetMapping("/all")
    public ResponseEntity getMembers(){
        return ResponseEntity.ok(mapper.membersToMemberResponses(memberService.findMembers()));
    }

    //회원 탈퇴
    @DeleteMapping
    public ResponseEntity deleteMember(){
        memberService.deleteMember(memberService.getLoginMember().getMemberId());

        return ResponseEntity.ok().build();
    }
}
