package com.bzzzzz.farm.domain.cart.controller;

import com.bzzzzz.farm.domain.cart.dto.CartProductPatchDto;
import com.bzzzzz.farm.domain.cart.dto.CartProductPostDto;
import com.bzzzzz.farm.domain.cart.entiy.Cart;
import com.bzzzzz.farm.domain.cart.mapper.CartMapper;
import com.bzzzzz.farm.domain.cart.service.CartService;
import com.bzzzzz.farm.global.dto.IdRequestDto;
import com.bzzzzz.farm.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/carts")
public class CartController {
    private final CartService cartService;
    private final CartMapper cartMapper;

    @GetMapping("/{cart-id}")
    public ResponseEntity getCart(@Positive @PathVariable("cart-id") long cartId) {
        //Todo: 로그인 관련 기능 들어오면 로그인했는지 확인하는 로직 필요 -> 멤버에서 카트를 가져온다 ?

        Cart cart = cartService.findCart(cartId);

        return new ResponseEntity(cartMapper.cartToCartResponseDto(cart), HttpStatus.OK);
    }

    @PostMapping("/products")
    public ResponseEntity postCartProduct(@Valid @RequestBody CartProductPostDto cartProductPostDto) {
        //Todo: 로그인 관련 기능 들어오면 로그인했는지 확인하는 로직 필요

        cartService.createCartProduct(cartMapper.cartProductPostDtoToCartProduct(cartProductPostDto));

        return new ResponseEntity<>(new SingleResponseDto(cartProductPostDto.getCartId()), HttpStatus.CREATED);
    }

    @PatchMapping("/products")
    public ResponseEntity patchCartProduct(@Valid @RequestBody CartProductPatchDto cartProductPatchDto) {
        //Todo: 로그인 관련 기능 들어오면 로그인했는지 확인하는 로직 필요

        cartService.updateCartProduct(cartProductPatchDto.getCartProductId(), cartProductPatchDto.getQuantity());

        return new ResponseEntity<>(new SingleResponseDto(cartProductPatchDto.getCartId()), HttpStatus.OK);
    }

    @DeleteMapping("/products")
    public ResponseEntity deleteCartProduct(@Valid @RequestBody IdRequestDto idRequestDto) {
        //Todo: 로그인 관련 기능 들어오면 로그인했는지 확인하는 로직 필요

        cartService.deleteCartProduct(idRequestDto.getId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
