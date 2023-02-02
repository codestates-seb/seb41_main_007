package com.bzzzzz.farm.config;


import com.bzzzzz.farm.common.security.handler.MemberAccessDeniedHandler;
import com.bzzzzz.farm.common.security.handler.MemberAuthenticationEntryPoint;
import com.bzzzzz.farm.common.security.handler.OAuth2MemberSuccessHandler;
import com.bzzzzz.farm.common.security.jwt.JwtTokenizer;
import com.bzzzzz.farm.repository.RefreshTokenRepository;
import com.bzzzzz.farm.service.CustomOAuth2MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final CorsFilter corsFilter;
    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthenticationEntryPoint memberAuthenticationEntryPoint;

    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberAccessDeniedHandler memberAccessDeniedHandler;
    private final CustomOAuth2MemberService customOAuth2MemberService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(memberAuthenticationEntryPoint)
                .accessDeniedHandler(memberAccessDeniedHandler)
                .and()
                .headers()
                .frameOptions()
                .sameOrigin()
                .and()
                .addFilter(corsFilter)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        //비로그인도 접근 가능 (누구나)
                        .antMatchers(HttpMethod.GET, "/categories").permitAll()
                        .antMatchers(HttpMethod.GET, "/").permitAll()
                        .antMatchers(HttpMethod.GET, "/caches/initialization").permitAll()
                        .antMatchers(HttpMethod.GET, "/orders/parcels/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/products/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/reviews/**").permitAll()
                        //어드민 전용
                        .antMatchers("/categories/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/members/all").hasRole("ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/orders").hasRole("ADMIN")
                        .antMatchers("/products/**").hasRole("ADMIN")
                        .antMatchers("/questions/answers/**").hasRole("ADMIN")
                        .antMatchers("/reviews/answers/**").hasRole("ADMIN")
                        //이외에는 로그인한 사람만 접근 가능
                        .anyRequest().hasAnyRole("ADMIN", "USER"))

                .apply(new JwtSecurityConfig(jwtTokenizer))
                // OAuth2.0 로그인 설정
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorization")
                .and()
                .redirectionEndpoint()
                .baseUri("/*/oauth2/code/*")
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2MemberService)
                .and()
                .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, refreshTokenRepository))
                .and()
                .logout()
                .disable();
        return http.build();
    }
}
