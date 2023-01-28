package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

import static com.bzzzzz.farm.common.Safety.toLong;

@RestController
@Validated
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/likes/{product-id}")
    public ResponseEntity postLike(@Positive @PathVariable("product-id") long productId,
                                   @AuthenticationPrincipal UserDetails userDetails) {

        likeService.createLike(toLong(userDetails.getUsername()), productId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/likes/{product-id}")
    public ResponseEntity deleteLike(@Positive @PathVariable("product-id") long productId,
                                     @AuthenticationPrincipal UserDetails userDetails) {

        likeService.deleteLike(toLong(userDetails.getUsername()), productId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
