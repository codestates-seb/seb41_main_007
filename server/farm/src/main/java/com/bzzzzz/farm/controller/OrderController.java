package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.config.ParcelTrackingConfig;
import com.bzzzzz.farm.mapper.OrderMapper;
import com.bzzzzz.farm.model.dto.SingleResponseDto;
import com.bzzzzz.farm.model.dto.order.OrderPostDto;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.service.OrderService;
import com.bzzzzz.farm.service.ProductOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderMapper orderMapper;
    private final OrderService orderService;
    private final ProductOptionService productOptionService;
    private final ParcelTrackingConfig parcelTrackingConfig;

    @PostMapping
    public ResponseEntity postOrder(@Valid @RequestBody OrderPostDto orderPostDto) {

        // Todo: 제품 주문이 가능한가 ?
        // Todo: 재고 계산해주기

        orderPostDto.getOrderProductPostDtos().stream()
                .forEach(orderProductPostDto -> orderProductPostDto
                        .setProductOption(
                                productOptionService.findVerifiedProductOption(orderProductPostDto.getProductOptionId())
                        ));

        Order order = orderService.createOrder(orderMapper.orderPostDtoToOrder(orderPostDto));

        return new ResponseEntity(new SingleResponseDto(order.getOrderId()), HttpStatus.CREATED);
    }

    @GetMapping("/parcels/{waybill-number}")
    public ResponseEntity getParcelLocation(@PathVariable("waybill-number") Long waybillNumber) {
        return new ResponseEntity<>(parcelTrackingConfig.traceAParcel(waybillNumber), HttpStatus.OK);
    }
}
