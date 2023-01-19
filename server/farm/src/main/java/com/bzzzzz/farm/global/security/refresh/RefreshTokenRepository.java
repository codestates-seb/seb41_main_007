package com.bzzzzz.farm.global.security.refresh;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByKey(String key);

    Optional<RefreshToken> findByValue(String value);
}
