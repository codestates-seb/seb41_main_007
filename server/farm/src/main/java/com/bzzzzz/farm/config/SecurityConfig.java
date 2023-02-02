package com.bzzzzz.farm.config;


import com.bzzzzz.farm.repository.RefreshTokenRepository;
import com.bzzzzz.farm.common.security.handler.MemberAccessDeniedHandler;
import com.bzzzzz.farm.common.security.handler.MemberAuthenticationEntryPoint;
import com.bzzzzz.farm.common.security.handler.OAuth2MemberSuccessHandler;
import com.bzzzzz.farm.common.security.jwt.JwtTokenizer;
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
                        //member
                        //.antMatchers(HttpMethod.GET,"/members").hasRole("ADMIN")
                        //address
                        //.antMatchers(HttpMethod.POST, "/products").hasRole("ADMIN")
                        //.antMatchers(HttpMethod.PATCH, "/products").hasRole("ADMIN")
                        //.antMatchers(HttpMethod.DELETE, "/products").hasRole("ADMIN")
                        //answer
                        //.antMatchers(HttpMethod.POST, "**/answers").hasRole("ADMIN")
                        //.antMatchers(HttpMethod.PATCH, "**/answers").hasRole("ADMIN")
                        //.antMatchers(HttpMethod.DELETE, "**/answers").hasRole("ADMIN")
                        //order
                        //.antMatchers(HttpMethod.PATCH,"/orders").hasRole("ADMIN")
                        //carts
                        //.antMatchers(HttpMethod.GET,"/carts").authenticated()
                        //address
                        //.antMatchers(HttpMethod.POST,"/addresses").authenticated()
                        //.antMatchers(HttpMethod.GET,"/addresses").authenticated()
                        .anyRequest().permitAll())
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
