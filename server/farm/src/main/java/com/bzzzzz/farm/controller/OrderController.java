package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.config.ParcelTrackingConfig;
import com.bzzzzz.farm.model.dto.SingleResponseDto;
import com.bzzzzz.farm.model.dto.order.OrderPatchDto;
import com.bzzzzz.farm.model.dto.order.OrderPostDto;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.service.OrderService;
import com.bzzzzz.farm.service.ProductOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import static com.bzzzzz.farm.common.Safety.toLong;

@RestController
@Validated
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final ProductOptionService productOptionService;
    private final ParcelTrackingConfig parcelTrackingConfig;

    @PostMapping("/orders")
    public ResponseEntity postOrder(@Valid @RequestBody OrderPostDto orderPostDto,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        orderPostDto.setMemberId(toLong(userDetails.getUsername()));

        orderPostDto.getOrderProductPostDtos().stream()
                .forEach(orderProductPostDto -> orderProductPostDto
                        .setProductOption(
                                productOptionService.findVerifiedProductOption(orderProductPostDto.getProductOptionId())
                        ));

        Order order = orderService.createOrder(orderPostDto);

        return new ResponseEntity(new SingleResponseDto(order.getOrderId()), HttpStatus.CREATED);
    }

    @DeleteMapping("/orders/{order-id}")
    public ResponseEntity cancelOrder(@Positive @PathVariable("order-id") long orderId,
                                      @AuthenticationPrincipal UserDetails userDetails) {
        // 사용자가 주문을 취소
        orderService.verifyAuthority(orderId, toLong(userDetails.getUsername()));

        orderService.cancelOrder(orderId);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PatchMapping("/orders")
    public ResponseEntity patchOrder(@Valid @RequestBody OrderPatchDto orderPatchDto) {
        // 어드민이 주문상태를 취소 및 변경

        orderService.updateOrder(orderPatchDto);

        return new ResponseEntity(new SingleResponseDto(orderPatchDto.getOrderId()), HttpStatus.OK);
    }

    @GetMapping("/orders/{order-id}")
    public ResponseEntity getOrder(@Positive @PathVariable("order-id") long orderId,
                                   @AuthenticationPrincipal UserDetails userDetails) {
        orderService.verifyAuthority(orderId, toLong(userDetails.getUsername()));

        return new ResponseEntity(orderService.findOrder(orderId), HttpStatus.OK);
    }

    @GetMapping("/orders/parcels/{waybill-number}")
    public ResponseEntity getParcelLocation(@PathVariable("waybill-number") Long waybillNumber) {
        return new ResponseEntity<>(parcelTrackingConfig.traceAParcel(waybillNumber), HttpStatus.OK);
    }
}
