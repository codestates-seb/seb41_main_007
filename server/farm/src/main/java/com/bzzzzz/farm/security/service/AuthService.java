package com.bzzzzz.farm.security.service;

import com.bzzzzz.farm.security.jwt.JwtTokenizer;
import com.bzzzzz.farm.security.utils.CustomAuthorityUtils;
import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.security.dto.LoginDto;
import com.bzzzzz.farm.security.dto.TokenDto;
import com.bzzzzz.farm.security.dto.TokenRequestDto;
import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.security.refresh.RefreshToken;
import com.bzzzzz.farm.member.repository.MemberRepository;
import com.bzzzzz.farm.security.refresh.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenizer jwtTokenizer;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;

    //회원가입
    public Member createMember(Member member){
        if (memberRepository.findByEmail(member.getEmail()).isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    //로그인 시 토큰 발급
    public TokenDto login(LoginDto loginDto){
        UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = createToken(authentication);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setKey(authentication.getName());
        refreshToken.setValue(tokenDto.getRefreshToken());

        refreshTokenRepository.save(refreshToken);

        return tokenDto;
    }

    // 토큰 재발급
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        if (!jwtTokenizer.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        Authentication authentication = jwtTokenizer.getAuthentication(tokenRequestDto.getAccessToken());

        RefreshToken refreshToken =
                refreshTokenRepository.findByKey(authentication.getName())
                        .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        TokenDto tokenDto = createToken(authentication);

        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        return tokenDto;
    }

    //로그아웃 시 refreshToken 제거
    public void logout(TokenRequestDto tokenRequestDto) {

        RefreshToken findRefreshToken = refreshTokenRepository.findByValue(tokenRequestDto.getRefreshToken())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND));

        refreshTokenRepository.delete(findRefreshToken);
    }

    private TokenDto createToken(Authentication authentication) {
        String accessToken = jwtTokenizer.generateAccessToken(authentication);
        String refreshToken = jwtTokenizer.generateRefreshToken(authentication);
        TokenDto tokenDto = new TokenDto(accessToken, refreshToken);
        return tokenDto;
    }
}
