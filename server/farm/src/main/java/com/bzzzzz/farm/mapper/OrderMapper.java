package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.order.OrderPostDto;
import com.bzzzzz.farm.model.dto.order.OrderProductPostDto;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.model.entity.OrderProduct;
import org.mapstruct.Mapper;

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
            order.calculatePrice(orderProduct.getShippingPrice() +
                    (orderProduct.getProductPrice() + orderProduct.getProductOptionPrice()) * orderProduct.getQuantity()
            );
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
}
