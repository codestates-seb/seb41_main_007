package com.bzzzzz.farm.common.security.jwt;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.repository.MemberRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenizer {
    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60;    // 액세스 토큰 만료 시간 : 1시간
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 리프레쉬 토큰 만료 시간 : 7일
    private final MemberRepository memberRepository;
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Authentication authentication,String base64EncodedSecretKey) {
        // claim 생성
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Map<String, String> claims = new HashMap<>();
        claims.put("auth", authorities);
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        claims.put("name",(String) oAuth2User.getAttributes().get("name"));
        long now = (new Date()).getTime();
        Long memberId = memberRepository.findByEmail((String) oAuth2User.getAttributes().get("email")).get().getMemberId();

        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        return Jwts.builder()
                .setClaims(claims)  // JWT에 담는 body
                .setSubject(String.valueOf(memberId))// JWT 제목 payload "sub": "memberId"
                .setIssuedAt(Calendar.getInstance().getTime())  // JWT 발행일자 payload "iat": "발행일자"
                .setExpiration(accessTokenExpiresIn)  // 만료일자 payload "exp": "발행시간 + 1시간"
                .signWith(getKey(base64EncodedSecretKey))
                .compact();
    }
    public String generateRefreshToken(Authentication authentication, String base64EncodedSecretKey) {
        long now = (new Date()).getTime();

        return Jwts.builder()
                .setSubject(authentication.getName())    // JWT 제목 payload "sub": "email"
                .setIssuedAt(Calendar.getInstance().getTime())  // JWT 발행일자 payload "iat": "발행일자"
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))  // 만료일자 payload "exp": "발행시간 + 7일"
                .signWith(getKey(base64EncodedSecretKey))
                .compact();
    }

    // 엑세스 토큰에서 인증정보 가져오기
    public Authentication getAuthentication(String accessToken, String base64EncodedSecretKey) {

        Claims claims = parseClaims(accessToken, base64EncodedSecretKey);

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증
    public boolean validateToken(String token, String base64EncodedSecretKey) {
        try {
            Jwts.parserBuilder().setSigningKey(getKey(base64EncodedSecretKey))
                    .build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new BusinessLogicException(ExceptionCode.WRONG_TOKEN_SIGNATURE); //잘못된 JWT 서명
        } catch (ExpiredJwtException e) {
            throw new BusinessLogicException(ExceptionCode.EXPIRATION_TOKEN); //만료된 JWT
        } catch (UnsupportedJwtException e) {
            throw new BusinessLogicException(ExceptionCode.UNSUPPORTED_TOKEN);   //지원되지 않는 JWT토큰
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");      //잘못된 JWT
        }
        return false;
    }

    // 만료된 토큰이어도 정보를 꺼내는 로직
    private Claims parseClaims(String accessToken, String base64EncodedSecretKey) {
        try {
            return Jwts.parserBuilder().setSigningKey(getKey(base64EncodedSecretKey))
                    .build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }
    private Key getKey(String base64EncodedSecretKey){
        return getKeyFromBase64EncodedKey(base64EncodedSecretKey);
    }
}