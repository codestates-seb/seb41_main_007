package com.bzzzzz.farm.cart.controller;

import com.bzzzzz.farm.cart.dto.CartProductPostDto;
import com.bzzzzz.farm.cart.mapper.CartProductMapper;
import com.bzzzzz.farm.cart.service.CartProductService;
import com.bzzzzz.farm.dto.IdResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/cartProducts")
public class CartController {
    private final CartProductService cartProductService;
    private final CartProductMapper cartProductMapper;

    @PostMapping
    public ResponseEntity postCartProduct(@Valid @RequestBody CartProductPostDto cartProductPostDto) {
        //Todo: 로그인 관련 기능 들어오면 로그인했는지 확인하는 로직 필요
        // 확인 후 카트 가져와서 postDto에 넘겨준다 vs 카트 유효성 검사

        cartProductService.createCartProduct(cartProductMapper.cartProductPostDtoToCartProduct(cartProductPostDto));

        return new ResponseEntity<>(new IdResponseDto(cartProductPostDto.getCartId()), HttpStatus.CREATED);
    }

}
