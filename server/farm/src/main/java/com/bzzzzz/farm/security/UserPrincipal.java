package com.bzzzzz.farm.security;

import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class UserPrincipal extends Member implements OAuth2User, UserDetails {
    private final Member member;
    private final Map<String, Object> oauthUserAttributes;


    //OAuth2 로그인시 사용
    public static UserPrincipal create(Member member, Map<String, Object> oauthUserAttributes) {
        return new UserPrincipal(member, oauthUserAttributes);
    }

    public static UserPrincipal create(Member member) {
        return new UserPrincipal(member, new HashMap<>());
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oauthUserAttributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return CustomAuthorityUtils.createAuthorities(this.getRoles());
    }


    @Override
    public String getName() {
        return member.getName();
    }
}
