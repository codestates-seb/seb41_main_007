package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.OrderMapper;
import com.bzzzzz.farm.model.dto.order.OrderPatchDto;
import com.bzzzzz.farm.model.dto.order.OrderPostDto;
import com.bzzzzz.farm.model.dto.order.OrderResponseDto;
import com.bzzzzz.farm.model.entity.*;
import com.bzzzzz.farm.repository.OrderRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private OrderMapper orderMapper;
    @InjectMocks
    private OrderService orderService;

    @Test
    @DisplayName("주문 생성-해피케이스")
    void createOrder1() {
        // given
        Order order = new Order();

        // 제품과 제품 옵션 세팅
        Product product1 = new Product();
        product1.setProductStatus(Product.ProductStatus.FOR_SALE);
        ProductOption productOption1 = new ProductOption();
        productOption1.setStock(5);

        // 주문 상세내역 세팅
        OrderProduct orderProduct1 = new OrderProduct();
        orderProduct1.setProduct(product1);
        orderProduct1.setProductOption(productOption1);
        orderProduct1.setQuantity(3);

        order.addOrderProduct(orderProduct1);

        given(orderMapper.orderPostDtoToOrder(Mockito.any(OrderPostDto.class))).willReturn(order);
        given(orderRepository.save(Mockito.any(Order.class))).willReturn(order);

        // when
        Order result = orderService.createOrder(OrderPostDto.builder().build());

        // then
        // 주문한 수량만큼 재고가 반영이 되는가?
        assertEquals(productOption1.getStock(), 2);
    }

    @Test
    @DisplayName("주문 생성-주문할수 없는 상태인 경우")
    void createOrder2() {
        // given
        Order order = new Order();

        // 제품과 상태 세팅
        Product product1 = new Product();
        product1.setProductStatus(Product.ProductStatus.PREPARING_FOR_SALE);

        // 주문 상세내역 세팅
        OrderProduct orderProduct1 = new OrderProduct();
        orderProduct1.setProduct(product1);

        order.addOrderProduct(orderProduct1);

        given(orderMapper.orderPostDtoToOrder(Mockito.any(OrderPostDto.class))).willReturn(order);

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> orderService.createOrder(OrderPostDto.builder().build()));
        assertEquals(ExceptionCode.CAN_NOT_ORDER_PRODUCT, exception.getExceptionCode());
    }

    @Test
    @DisplayName("주문 생성-재고가 부족한 경우")
    void createOrder3() {
        // given
        Order order = new Order();

        // 제품과 제품 옵션 세팅
        Product product1 = new Product();
        product1.setProductStatus(Product.ProductStatus.FOR_SALE);
        ProductOption productOption1 = new ProductOption();
        productOption1.setStock(5);

        // 주문 상세내역 세팅
        OrderProduct orderProduct1 = new OrderProduct();
        orderProduct1.setProduct(product1);
        orderProduct1.setProductOption(productOption1);
        orderProduct1.setQuantity(productOption1.getStock() + 1); // 재고보다 주문 수량이 더 많도록 세팅

        order.addOrderProduct(orderProduct1);

        given(orderMapper.orderPostDtoToOrder(Mockito.any(OrderPostDto.class))).willReturn(order);

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> orderService.createOrder(OrderPostDto.builder().build()));
        assertEquals(ExceptionCode.NOT_ENOUGH_STOCK, exception.getExceptionCode());
    }

    @Test
    @DisplayName("주문 취소-해피케이스")
    void cancelOrder1() {
        // given
        int beforeProductOptionStock = 10;
        int quantity = 5;

        ProductOption productOption = new ProductOption();
        productOption.setStock(beforeProductOptionStock);
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrderStatus(OrderProduct.OrderStatus.PRODUCT_PREPARATION);
        orderProduct.setProductOption(productOption);
        orderProduct.setQuantity(quantity);

        Order order = new Order();
        order.setOrderId(1L);
        order.addOrderProduct(orderProduct);

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(order));

        // when
        orderService.cancelOrder(order.getOrderId());

        // then
        assertEquals(beforeProductOptionStock + quantity, productOption.getStock());
        assertEquals(OrderProduct.OrderStatus.CANCEL, order.getOrderProducts().get(0).getOrderStatus());
    }

    @Test
    @DisplayName("주문 취소-취소할 수 없는 상태일 경우")
    void cancelOrder2() {
        // given
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrderStatus(OrderProduct.OrderStatus.PRODUCT_SHIPMENT); // 제품이 이미 출고된 상태

        Order order = new Order();
        order.setOrderId(1L);
        order.addOrderProduct(orderProduct);

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(order));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> orderService.cancelOrder(order.getOrderId()));
        assertEquals(ExceptionCode.CAN_NOT_CANCEL_ORDER, exception.getExceptionCode());
    }

    @Test
    @DisplayName("주문 업데이트-결재완료,결재방법변경")
    void updateOrder1() {
        // given
        OrderPatchDto patchDto = new OrderPatchDto();
        patchDto.setOrderId(1L);
        patchDto.setPaymentStatus(Order.PaymentStatus.COMPLETED);
        patchDto.setPaymentMethod(Order.PaymentMethod.BANK_BOOK);

        Order order = new Order();
        order.setOrderId(patchDto.getOrderId());

        // 제품과 제품 옵션 세팅
        Product product1 = new Product();
        product1.setProductStatus(Product.ProductStatus.FOR_SALE);
        ProductOption productOption1 = new ProductOption();
        productOption1.setStock(5);

        // 주문 상세내역 세팅
        OrderProduct orderProduct1 = new OrderProduct();
        orderProduct1.setProduct(product1);
        orderProduct1.setProductOption(productOption1);
        orderProduct1.setQuantity(3);

        order.addOrderProduct(orderProduct1);

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(order));

        // when
        Order result = orderService.updateOrder(patchDto);

        // then
        assertEquals(patchDto.getPaymentMethod(), result.getPaymentMethod());
        assertEquals(patchDto.getPaymentStatus(), result.getPaymentStatus());
    }

    @Test
    @DisplayName("주문 업데이트-결제취소")
    void updateOrder2() {
        // given
        OrderPatchDto patchDto = new OrderPatchDto();
        patchDto.setOrderId(1L);
        patchDto.setPaymentStatus(Order.PaymentStatus.CANCEL);

        Order order = new Order();
        order.setOrderId(patchDto.getOrderId());

        // 제품과 제품 옵션 세팅
        Product product1 = new Product();
        product1.setProductStatus(Product.ProductStatus.FOR_SALE);
        ProductOption productOption1 = new ProductOption();
        productOption1.setStock(5);

        // 주문 상세내역 세팅
        OrderProduct orderProduct1 = new OrderProduct();
        orderProduct1.setProduct(product1);
        orderProduct1.setProductOption(productOption1);
        orderProduct1.setQuantity(3);

        order.addOrderProduct(orderProduct1);

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(order));

        // when
        Order result = orderService.updateOrder(patchDto);

        // then
        assertEquals(patchDto.getPaymentStatus(), result.getPaymentStatus());
        assertEquals(8, productOption1.getStock());
    }

    @Test
    @DisplayName("주문조회-해피케이스")
    void findOrder1() {
        // given
        long orderId = 1L;
        OrderResponseDto orderResponseDto = OrderResponseDto
                .builder()
                .orderId(orderId)
                .build();

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(new Order()));
        given(orderMapper.orderToOrderResponseDto(Mockito.any(Order.class))).willReturn(orderResponseDto);

        // when
        OrderResponseDto result = orderService.findOrder(orderId);

        // then
        assertEquals(orderId, result.getOrderId());
    }

    @Test
    @DisplayName("주문조회-주문이 존재하지 않는 경우")
    void findOrder2() {
        // given
        long orderId = 1L;

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(null));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> orderService.findOrder(orderId));
        assertEquals(ExceptionCode.ORDER_NOT_FOUND, exception.getExceptionCode());
    }

    @Test
    @DisplayName("주문에 대한 권한 확인-해피케이스")
    void verifyAuthority1() {
        // given
        Member member = new Member();
        member.setMemberId(1L);

        Order order = new Order();
        order.setOrderId(1L);
        order.setMember(member);

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(order));

        // when
        // then
        orderService.verifyAuthority(order.getOrderId(), member.getMemberId());
    }

    @Test
    @DisplayName("주문에 대한 권한 확인-권한이 없는 경우")
    void verifyAuthority2() {
        // given
        Member member = new Member();
        member.setMemberId(1L);

        Order order = new Order();
        order.setOrderId(1L);
        order.setMember(member);

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(order));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> orderService.verifyAuthority(order.getOrderId(), 2L));
        assertEquals(ExceptionCode.REQUEST_FORBIDDEN, exception.getExceptionCode());
    }

    @Test
    @DisplayName("결제 가능 상태인지 확인-해피케이스")
    void verifyPaymentStatus1() {
        // given
        Order order = new Order();
        order.setPaymentStatus(Order.PaymentStatus.NOT_PAYMENT);

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(order));

        // when
        // then
        orderService.verifyPaymentStatus(1L);
    }

    @Test
    @DisplayName("결제 가능 상태인지 확인-결제 불가능한 상태인 경우")
    void verifyPaymentStatus2() {
        // given
        Order order = new Order();
        order.setPaymentStatus(Order.PaymentStatus.COMPLETED);

        given(orderRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(order));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> orderService.verifyPaymentStatus(1L));
        assertEquals(ExceptionCode.CAN_NOT_PAY, exception.getExceptionCode());
    }
}
