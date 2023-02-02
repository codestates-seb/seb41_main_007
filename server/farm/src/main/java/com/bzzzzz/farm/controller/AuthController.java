package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.member.TokenRequestDto;
import com.bzzzzz.farm.service.AuthService;
import com.bzzzzz.farm.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import static com.bzzzzz.farm.common.Safety.toLong;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    //토큰 재발급
    @PostMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request, @RequestBody TokenRequestDto tokenRequestDto,
                                  @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(authService.reissue(request,tokenRequestDto,toLong(userDetails.getUsername())));
    }

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity logout(@AuthenticationPrincipal UserDetails userDetails){

        if (userDetails != null) {
            authService.logout(toLong(userDetails.getUsername()));
        }
        return ResponseEntity.ok().build();
    }
}
