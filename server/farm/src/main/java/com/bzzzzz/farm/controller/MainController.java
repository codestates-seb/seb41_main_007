package com.bzzzzz.farm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequiredArgsConstructor
public class MainController {
    @GetMapping("/caches/initialization")
    @CacheEvict(cacheNames = "test", allEntries = true)
    public ResponseEntity initializeCache() {
        return new ResponseEntity("캐쉬가 초기화 되었습니다.", HttpStatus.OK);
    }
}
