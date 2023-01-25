package com.bzzzzz.farm.service;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.model.entity.OrderProduct;
import com.bzzzzz.farm.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    public void cancelOrder(long orderId) {
        Order order = findVerifiedOrder(orderId);
        order.getOrderProducts().stream()
                .forEach(orderProduct -> {
                    if (orderProduct.getOrderStatus().getStep() > 3) {
                        throw new BusinessLogicException(ExceptionCode.CAN_NOT_CANCEL_ORDER);
                    }
                    orderProduct.setOrderStatus(OrderProduct.OrderStatus.CANCEL);

                    orderProduct.getProductOption().calculateStock(orderProduct.getQuantity());
                });

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

    @Transactional(readOnly = true)
    private Order findVerifiedOrder(long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        return optionalOrder.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
    }
}
