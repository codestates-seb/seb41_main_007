package com.bzzzzz.farm.controller;


import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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

    //회원 정보 수정
    @PatchMapping
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch request,
                                      @AuthenticationPrincipal UserDetails userDetails){
        request.setMemberId(Long.valueOf(userDetails.getUsername()));

        return ResponseEntity.ok(memberService.updateMember(request));
    }

    //본인 프로필 보기
    @GetMapping
    public ResponseEntity getMember(@AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(memberService.findMember(Long.valueOf(userDetails.getUsername())));
    }

    //전체 회원 조회(관리자 전용)
    @GetMapping("/all")
    public ResponseEntity getMembers(){
        return ResponseEntity.ok(memberService.findMembers());
    }

    //회원 탈퇴
    @DeleteMapping
    public ResponseEntity deleteMember(@AuthenticationPrincipal UserDetails userDetails){
        memberService.deleteMember(Long.valueOf(userDetails.getUsername()));

        return ResponseEntity.ok().build();
    }
}