package com.bzzzzz.farm.controller;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @GetMapping
    public ResponseEntity getMain() {
        String response = "<!doctype html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\"\n" +
                "          content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
                "</head>\n" +
                "<body>\n" +
                "<h1>농장과사람들 백엔드 서버입니다</h1>\n" +
                "<ul>\n" +
                "    <li><a href=\"https://d37w3g5qmrrpnl.cloudfront.net/\" target=\"_blank\">배포링크로 이동하기</a></li>\n" +
                "    <li><a href=\"https://github.com/codestates-seb/seb41_main_007\" target=\"_blank\">깃허브로 이동하기</a></li>\n" +
                "    <li><a href=\"https://documenter.getpostman.com/view/23681373/2s8Z76v8iT\" target=\"_blank\">API 문서 보기 (PostMan)</a></li>\n" +
                "    <li><a href=\"https://farmandpeople.p-e.kr:8080/docs/index.html\" target=\"_blank\">API 문서 보기 (RestDocs)</a></li>\n" +
                "</ul>\n" +
                "</body>\n" +
                "</html>";
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/caches/initialization")
    @CacheEvict(value = {"findProducts", "findCategories", "findReviewsOrderByReviewId"}, allEntries = true)
    public ResponseEntity initializeCache() {
        return new ResponseEntity("캐시가 초기화 되었습니다.", HttpStatus.OK);
    }
}
