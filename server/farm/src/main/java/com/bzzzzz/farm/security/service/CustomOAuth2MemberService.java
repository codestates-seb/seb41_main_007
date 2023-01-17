package com.bzzzzz.farm.security.service;

import com.bzzzzz.farm.security.attribute.OAuthAttributes;
import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class CustomOAuth2MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    @SneakyThrows
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        //OAuth2 서비스 id 구분코드(구글, 카카오)
        String registrationId = userRequest
                .getClientRegistration()
                .getRegistrationId();

        //OAuth2 로그인 진행시 키가 되는 필드 값
        String userNameAttributeName = userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        Member member = saveOrUpdate(attributes);


        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRoles().toString())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }
    private Member saveOrUpdate(OAuthAttributes oAuthAttributes){
        Member member = memberRepository.findByEmail(oAuthAttributes.getEmail())
                .orElse(oAuthAttributes.toEntity());
        return memberRepository.save(member);
    }
}