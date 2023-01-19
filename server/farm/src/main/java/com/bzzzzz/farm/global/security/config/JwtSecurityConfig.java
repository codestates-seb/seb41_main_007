package com.bzzzzz.farm.global.security.config;

import com.bzzzzz.farm.global.security.filter.JwtVerificationFilter;
import com.bzzzzz.farm.global.security.jwt.JwtTokenizer;
import com.bzzzzz.farm.global.security.utils.HeaderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final JwtTokenizer jwtTokenizer;

    @Override
    public void configure(HttpSecurity builder) throws Exception {
        JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);
        builder.addFilterBefore(jwtVerificationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
