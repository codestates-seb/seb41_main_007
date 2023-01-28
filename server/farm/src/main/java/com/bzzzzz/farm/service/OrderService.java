package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.OrderMapper;
import com.bzzzzz.farm.model.dto.order.OrderPatchDto;
import com.bzzzzz.farm.model.dto.order.OrderPostDto;
import com.bzzzzz.farm.model.dto.order.OrderResponseDto;
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
    private final OrderMapper orderMapper;

    public Order createOrder(OrderPostDto orderPostDto) {
        Order order = orderMapper.orderPostDtoToOrder(orderPostDto);

        verifyCanOrder(order);
        order.getOrderProducts().stream()
                .forEach(orderProduct -> orderProduct.getProductOption().calculateStock(-orderProduct.getQuantity()));

        return orderRepository.save(order);
    }

    public void cancelOrder(long orderId) { // 사용자가 주문을 취소
        Order order = findVerifiedOrder(orderId);
        order.getOrderProducts().stream()
                .forEach(orderProduct -> verifyCancelOrder(orderProduct));
    }

    public Order updateOrder(OrderPatchDto orderPatchDto) { // 어드민이 주문상태를 변경
        Order order = findVerifiedOrder(orderPatchDto.getOrderId());

        Optional.ofNullable(orderPatchDto.getPaymentMethod()).ifPresent(data -> order.setPaymentMethod(data));
        Optional.ofNullable(orderPatchDto.getPaymentStatus()).ifPresent(data -> {
            order.setPaymentStatus(data);

            if (data == Order.PaymentStatus.COMPLETED) {
                order.getOrderProducts().stream()
                        .forEach(orderProduct -> orderProduct.setOrderStatus(OrderProduct.OrderStatus.PAYMENT_COMPLETED));
            }
            if (data == Order.PaymentStatus.CANCEL) {
                order.getOrderProducts().stream()
                        .forEach(orderProduct -> verifyCancelOrder(orderProduct));
            }
        });

        return order;
    }

    @Transactional(readOnly = true)
    public OrderResponseDto findOrder(long orderId) {
        return orderMapper.orderToOrderResponseDto(
                findVerifiedOrder(orderId)
        );
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private Order findVerifiedOrder(long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        return optionalOrder.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ORDER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    private void verifyCanOrder(Order order) {
        order.getOrderProducts().stream()
                .forEach(orderProduct -> {
                    // 1=판매준비중, 2=판매중지, 3=판매중 -> 1,2는 주문할 수 없는 상태
                    if (orderProduct.getProduct().getProductStatus().getCode() < 3) {
                        throw new BusinessLogicException(ExceptionCode.CAN_NOT_ORDER_PRODUCT);
                    }
                    // 재고 - 주문수량 < 0 재고가 부족하므로 주문 불가
                    if (orderProduct.getProductOption().getStock() - orderProduct.getQuantity() < 0) {
                        throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_STOCK);
                    }
                });
    }

    private void verifyCancelOrder(OrderProduct orderProduct) {
        if (orderProduct.getOrderStatus().getStep() > 3) { // 3이하는 주문을 변경할 수 있는 상태: 상품출고전
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_CANCEL_ORDER);
        }
        orderProduct.setOrderStatus(OrderProduct.OrderStatus.CANCEL);

        orderProduct.getProductOption().calculateStock(orderProduct.getQuantity());
    }

    @Transactional(readOnly = true)
    public void verifyAuthority(long orderId, long memberId) {
        Order order = findVerifiedOrder(orderId);
        if (order.getMember().getMemberId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.REQUEST_FORBIDDEN);
        }
    }

    @Transactional(readOnly = true)
    public Order verifyPaymentStatus(long orderId) {
        Order order = findVerifiedOrder(orderId);
        if (order.getPaymentStatus().getCode() > 1) { // 1=결제전, 2=결제완료, 3=결제취소
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_PAY);
        }
        return order;
    }
}
