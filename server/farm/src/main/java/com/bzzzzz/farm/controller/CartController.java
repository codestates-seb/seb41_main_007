package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.CartMapper;
import com.bzzzzz.farm.model.dto.cart.CartRequestDto;
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
    public ResponseEntity postCart(@RequestBody CartRequestDto cartRequestDto,
                                   @AuthenticationPrincipal UserDetails userDetails) {
        ProductOption productOption = productOptionService.findVerifiedProductOption(cartRequestDto.getProductOptionId());

        cartService.createCartProduct(toLong(userDetails.getUsername()), productOption, cartRequestDto.getQuantity());

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/carts")
    public ResponseEntity patchCart(@RequestBody CartRequestDto cartRequestDto,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        cartService.updateCart(toLong(userDetails.getUsername()), cartRequestDto.getProductOptionId(), cartRequestDto.getQuantity());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/carts/{product-option-id}")
    public ResponseEntity deleteCart(@Positive @PathVariable("product-option-id") long productOptionId,
                                     @AuthenticationPrincipal UserDetails userDetails) {
        cartService.deleteCart(toLong(userDetails.getUsername()), productOptionId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/carts")
    public ResponseEntity deleteCarts(@RequestParam List<Long> list,
                                      @AuthenticationPrincipal UserDetails userDetails) {

//        for (long cartId : list) {
//            cartService.verifyAuthority();
//        }

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
