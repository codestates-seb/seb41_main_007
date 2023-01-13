package com.bzzzzz.farm.cart.controller;

import com.bzzzzz.farm.cart.entiy.Cart;
import com.bzzzzz.farm.cart.mapper.CartMapper;
import com.bzzzzz.farm.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
