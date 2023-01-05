package com.bzzzzz.farm.member.controller;


import com.bzzzzz.farm.member.dto.MemberDto;
import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.member.mapper.MemberMapper;
import com.bzzzzz.farm.member.service.MemberService;
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

    //회원가입
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody){
        Member member = memberService.createMember(mapper.memberPostToMember(requestBody));
        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    //회원 정보 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId){
        return ResponseEntity.ok(null);
    }

    //본인 프로필 보기
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        return ResponseEntity.ok(null);
    }

    //전체 회원 조회(관리자 전용)
    @GetMapping
    public ResponseEntity getMembers(){
        return ResponseEntity.ok(null);
    }

    //회원 탈퇴
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
        return ResponseEntity.ok().build();
    }

}
