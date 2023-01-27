package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.CartMapper;
import com.bzzzzz.farm.model.dto.cart.CartPatchDto;
import com.bzzzzz.farm.model.dto.cart.CartPostDto;
import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.service.CartService;
import com.bzzzzz.farm.service.MemberService;
import com.bzzzzz.farm.service.ProductOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/carts")
public class CartController {
    private final CartService cartService;
    private final CartMapper cartMapper;
    private final MemberService memberService;
    private final ProductOptionService productOptionService;

    @GetMapping
    public ResponseEntity getCarts(@AuthenticationPrincipal UserDetails userDetails) {
        List<Cart> carts = cartService.findCartsByMemberId(Long.valueOf(userDetails.getUsername()));

        return new ResponseEntity(cartMapper.cartsToCartResponseDtos(carts), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postCart(@RequestBody CartPostDto cartPostDto) {
        Member member = memberService.getLoginMember();
        ProductOption productOption = productOptionService.findVerifiedProductOption(cartPostDto.getProductOptionId());

        cartService.createCartProduct(member, productOption, cartPostDto.getQuantity());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity patchCartProduct(@RequestBody CartPatchDto cartPatchDto) {
        cartService.verifyAuthority(cartPatchDto.getCartId(), memberService.getLoginMember().getMemberId());

        cartService.updateCart(cartPatchDto.getCartId(), cartPatchDto.getQuantity());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{cart-id}")
    public ResponseEntity deleteCartProduct(@Positive @PathVariable("cart-id") long cartId) {
        cartService.verifyAuthority(cartId, memberService.getLoginMember().getMemberId());

        cartService.deleteCart(cartId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
