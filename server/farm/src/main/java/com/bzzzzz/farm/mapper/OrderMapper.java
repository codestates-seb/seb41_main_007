package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.order.OrderPostDto;
import com.bzzzzz.farm.model.dto.order.OrderProductPostDto;
import com.bzzzzz.farm.model.dto.order.OrderProductResponseDto;
import com.bzzzzz.farm.model.dto.order.OrderResponseDto;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.model.entity.OrderProduct;
import org.mapstruct.Mapper;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    default Order orderPostDtoToOrder(OrderPostDto orderPostDto) {
        if (orderPostDto == null) {
            return null;
        }
        Order order = Order
                .builder()
                .member(orderPostDto.getMember())
                .address(orderPostDto.getAddress())
                .name(orderPostDto.getName())
                .phone(orderPostDto.getPhone())
                .build();

        for (OrderProductPostDto orderProductPostDto : orderPostDto.getOrderProductPostDtos()) {
            OrderProduct orderProduct = orderProductPostDtoToOrderProduct(orderProductPostDto);
            order.addOrderProduct(orderProduct);
            order.calculatePrice(orderProduct.getTotalPrice());
        }

        return order;
    }

    default OrderProduct orderProductPostDtoToOrderProduct(OrderProductPostDto orderProductPostDto) {
        if (orderProductPostDto == null) {
            return null;
        }
        return OrderProduct
                .builder()
                .product(orderProductPostDto.getProductOption().getProduct())
                .productOption(orderProductPostDto.getProductOption())
                .quantity(orderProductPostDto.getQuantity())
                .productPrice(orderProductPostDto.getProductOption().getProduct().getPrice())
                .productOptionPrice(orderProductPostDto.getProductOption().getPrice())
                .shippingCountry(orderProductPostDto.getProductOption().getProduct().getShippingCountry())
                .shippingMethod(orderProductPostDto.getProductOption().getProduct().getShippingMethod())
                .shippingPrice(orderProductPostDto.getProductOption().getProduct().getShippingPrice())
                .build();
    }

    default OrderResponseDto orderToOrderResponseDto(Order order) {
        if (order == null) {
            return null;
        }
        return OrderResponseDto
                .builder()
                .orderId(order.getOrderId())
                .memberId(order.getMember().getMemberId())
                .memberName(order.getMember().getName())
                .name(order.getName())
                .address(order.getAddress())
                .phone(order.getPhone())
                .price(order.getPrice())
                .paymentMethod(order.getPaymentMethod().getMethod())
                .paymentStatus(order.getPaymentStatus().getStatus())
                .orderProductResponseDtos(order.getOrderProducts().stream()
                        .map(orderProduct -> orderProductToOrderProductResponseDto(orderProduct))
                        .collect(Collectors.toList()))
                .createdAt(order.getCreatedAt())
                .build();
    }

    default OrderProductResponseDto orderProductToOrderProductResponseDto(OrderProduct orderProduct) {
        if (orderProduct == null) {
            return null;
        }
        return OrderProductResponseDto
                .builder()
                .orderProductId(orderProduct.getOrderProductId())
                .productId(orderProduct.getProduct().getProductId())
                .productName(orderProduct.getProduct().getName())
                .productPrice(orderProduct.getProductPrice())
                .productOptionId(orderProduct.getProductOption().getProductOptionId())
                .productOptionName(orderProduct.getProductOption().getProductOptionName())
                .quantity(orderProduct.getQuantity())
                .productOptionPrice(orderProduct.getProductOptionPrice())
                .shippingCountry(orderProduct.getShippingCountry().getShippingType())
                .shippingMethod(orderProduct.getShippingMethod().getShippingMethod())
                .shippingPrice(orderProduct.getShippingPrice())
                .waybillNumber(orderProduct.getWaybillNumber())
                .orderStatus(orderProduct.getOrderStatus().getStatus())
                .build();
    }
}
