package com.bzzzzz.farm.global.security.handler;

import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.member.service.MemberService;
import com.bzzzzz.farm.global.security.entity.RefreshToken;
import com.bzzzzz.farm.global.security.entity.RefreshTokenRepository;
import com.bzzzzz.farm.global.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("# Redirect to Frontend");
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(authentication, base64EncodedSecretKey);
        String refreshToken = jwtTokenizer.generateRefreshToken(authentication, base64EncodedSecretKey);

        RefreshToken token = new RefreshToken();
        token.setKey(email);
        token.setValue(refreshToken);

        refreshTokenRepository.save(token);

        String url = makeRedirectUrl(accessToken, refreshToken);

        getRedirectStrategy().sendRedirect(request, response, url);
    }

    private String makeRedirectUrl(String accessToken, String refreshToken) {
        return UriComponentsBuilder.fromUriString("http://localhost:3000/auth")
                .queryParam("access_token", accessToken)
                .queryParam("refresh_token", refreshToken)
                .build().toUriString();
    }
}