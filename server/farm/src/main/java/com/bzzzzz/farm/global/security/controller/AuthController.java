package com.bzzzzz.farm.global.security.controller;

import com.bzzzzz.farm.global.security.dto.TokenDto;
import com.bzzzzz.farm.global.security.dto.LoginDto;
import com.bzzzzz.farm.domain.member.dto.MemberDto;
import com.bzzzzz.farm.global.security.dto.TokenRequestDto;
import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.member.mapper.MemberMapper;
import com.bzzzzz.farm.global.security.service.AuthService;
import com.bzzzzz.farm.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody MemberDto.Post memberPostDto){
        Member member = authService.createMember(mapper.memberPostToMember(memberPostDto));
        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }


    //로그인
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDto loginDto) {
        TokenDto tokenDto  = authService.login(loginDto);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization","Bearer "+tokenDto.getAccessToken());
        return new ResponseEntity<>(authService.login(loginDto),headers, HttpStatus.CREATED);
    }

    //토큰 재발급
    @PostMapping("/reissue")
    public ResponseEntity reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity logout(@RequestBody TokenRequestDto tokenRequestDto){
        Member member = memberService.getLoginMember();
        if (member != null) {
            authService.logout(tokenRequestDto);
        }
        return ResponseEntity.ok().build();
    }
}
