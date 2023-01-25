package com.bzzzzz.farm.service;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public Order createOrder(Order order) {
        verifyCanOrder(order);
        order.getOrderProducts().stream()
                .forEach(orderProduct -> orderProduct.getProductOption().calculateStock(-orderProduct.getQuantity()));

        return orderRepository.save(order);
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private void verifyCanOrder(Order order) {
        order.getOrderProducts().stream()
                .forEach(orderProduct -> {
                    if (orderProduct.getProduct().getProductStatus().getCode() < 3) {
                        throw new BusinessLogicException(ExceptionCode.CAN_NOT_ORDER_PRODUCT);
                    }

                    if (orderProduct.getProductOption().getStock() - orderProduct.getQuantity() < 0) {
                        throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_STOCK);
                    }
                });
    }
}
