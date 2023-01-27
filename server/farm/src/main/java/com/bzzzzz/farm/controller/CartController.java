package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.CartMapper;
import com.bzzzzz.farm.model.dto.cart.CartPatchDto;
import com.bzzzzz.farm.model.dto.cart.CartPostDto;
import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.service.CartService;
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

import static com.bzzzzz.farm.common.Safety.toLong;

@RestController
@Validated
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final CartMapper cartMapper;
    private final ProductOptionService productOptionService;

    @GetMapping("/carts")
    public ResponseEntity getCarts(@AuthenticationPrincipal UserDetails userDetails) {
        List<Cart> carts = cartService.findCartsByMemberId(toLong(userDetails.getUsername()));

        return new ResponseEntity(cartMapper.cartsToCartResponseDtos(carts), HttpStatus.OK);
    }

    @PostMapping("/carts")
    public ResponseEntity postCart(@RequestBody CartPostDto cartPostDto,
                                   @AuthenticationPrincipal UserDetails userDetails) {
        ProductOption productOption = productOptionService.findVerifiedProductOption(cartPostDto.getProductOptionId());

        cartService.createCartProduct(toLong(userDetails.getUsername()), productOption, cartPostDto.getQuantity());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/carts")
    public ResponseEntity patchCartProduct(@RequestBody CartPatchDto cartPatchDto,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        cartService.verifyAuthority(cartPatchDto.getCartId(), toLong(userDetails.getUsername()));

        cartService.updateCart(cartPatchDto.getCartId(), cartPatchDto.getQuantity());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/carts/{cart-id}")
    public ResponseEntity deleteCartProduct(@Positive @PathVariable("cart-id") long cartId,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        cartService.verifyAuthority(cartId, toLong(userDetails.getUsername()));

        cartService.deleteCart(cartId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
