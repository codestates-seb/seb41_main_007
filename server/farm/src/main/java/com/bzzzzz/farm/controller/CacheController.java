package com.bzzzzz.farm.controller;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CacheController {
    @GetMapping("/caches/initialization")
    @CacheEvict(value = {"findProducts", "findCategories", "findReviewsOrderByReviewId"}, allEntries = true)
    public ResponseEntity initializeCache() {
        return new ResponseEntity("캐시가 초기화 되었습니다.", HttpStatus.OK);
    }
}
