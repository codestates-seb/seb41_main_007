package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.security.jwt.JwtTokenizer;
import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.model.dto.member.TokenDto;
import com.bzzzzz.farm.model.dto.member.TokenRequestDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.RefreshToken;
import com.bzzzzz.farm.repository.MemberRepository;
import com.bzzzzz.farm.repository.RefreshTokenRepository;
import com.bzzzzz.farm.utils.HeaderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;

    // 토큰 재발급
    public TokenDto reissue(HttpServletRequest request, TokenRequestDto tokenRequestDto, long memberId) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        if (!jwtTokenizer.validateToken(tokenRequestDto.getRefreshToken(),base64EncodedSecretKey)) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        Authentication authentication = jwtTokenizer.getAuthentication(HeaderUtil.getAccessToken(request), base64EncodedSecretKey);

        Member member = memberRepository.findById(memberId).get();
        RefreshToken refreshToken =
                refreshTokenRepository.findByKey(member.getEmail())
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
    public void logout(long memberId) {
        RefreshToken token = refreshTokenRepository.findByKey(memberRepository.findById(memberId).get().getEmail())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND));
        refreshTokenRepository.delete(token);
    }

    private TokenDto createToken(Authentication authentication) {
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.reissueAccessToken(authentication, base64EncodedSecretKey);
        String refreshToken = jwtTokenizer.generateRefreshToken(authentication, base64EncodedSecretKey);
        TokenDto tokenDto = new TokenDto(accessToken, refreshToken);
        return tokenDto;
    }
}