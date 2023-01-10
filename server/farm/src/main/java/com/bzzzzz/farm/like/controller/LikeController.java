package com.bzzzzz.farm.like.controller;

import com.bzzzzz.farm.like.dto.LikeRequestDto;
import com.bzzzzz.farm.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/likes")
public class LikeController {
    private final LikeService likeService;

    @PostMapping
    public ResponseEntity postLike(@Valid @RequestBody LikeRequestDto likeRequestDto) {

        likeService.createLike(likeRequestDto.getMemberId(), likeRequestDto.getProductId());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity deleteLike(@Valid @RequestBody LikeRequestDto likeRequestDto) {

        likeService.deleteLike(likeRequestDto.getMemberId(), likeRequestDto.getProductId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
