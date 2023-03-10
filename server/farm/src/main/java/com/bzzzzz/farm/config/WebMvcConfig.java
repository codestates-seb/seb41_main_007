package com.bzzzzz.farm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebMvcConfig {
    // Cors 허용을 위한 filter
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);   // json을 자바스크립트에서 처리할 수 있음
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("https://farmpi.link/");
        config.addAllowedOrigin("https://www.farmpi.link/");
        config.addAllowedOrigin("https://main.d1b6oavx6u3nu8.amplifyapp.com/");
        config.addAllowedOrigin("https://d37w3g5qmrrpnl.cloudfront.net/");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
