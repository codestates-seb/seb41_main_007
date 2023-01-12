package com.bzzzzz.farm.cart.controller;

import com.bzzzzz.farm.cart.dto.CartProductPatchDto;
import com.bzzzzz.farm.cart.dto.CartProductPostDto;
import com.bzzzzz.farm.cart.mapper.CartMapper;
import com.bzzzzz.farm.cart.service.CartProductService;
import com.bzzzzz.farm.dto.IdRequestDto;
import com.bzzzzz.farm.dto.IdResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/cartProducts")
public class CartProductController {
    private final CartProductService cartProductService;
    private final CartMapper cartMapper;

    @PostMapping
    public ResponseEntity postCartProduct(@Valid @RequestBody CartProductPostDto cartProductPostDto) {
        //Todo: 로그인 관련 기능 들어오면 로그인했는지 확인하는 로직 필요

        cartProductService.createCartProduct(cartMapper.cartProductPostDtoToCartProduct(cartProductPostDto));

        return new ResponseEntity<>(new IdResponseDto(cartProductPostDto.getCartId()), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity patchCartProduct(@Valid @RequestBody CartProductPatchDto cartProductPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 로그인했는지 확인하는 로직 필요

        cartProductService.updateCartProduct(cartProductPatchDto.getCartProductId(), cartProductPatchDto.getQuantity());

        return new ResponseEntity<>(new IdResponseDto(cartProductPatchDto.getCartId()), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteCartProduct(@Valid @RequestBody IdRequestDto idRequestDto) {
        //Todo: 로그인 관련 기능 들어오면 로그인했는지 확인하는 로직 필요

        cartProductService.deleteCartProduct(idRequestDto.getId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
