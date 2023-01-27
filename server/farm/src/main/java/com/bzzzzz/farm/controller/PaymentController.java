package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.order.OrderPatchDto;
import com.bzzzzz.farm.model.dto.payment.KakaoApproveResponse;
import com.bzzzzz.farm.model.dto.payment.KakaoCancelResponse;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.service.OrderService;
import com.bzzzzz.farm.service.PaymentService;
import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final OrderService orderService;
    /**
     결제요청
     **/
    @PostMapping("/ready")
    public ResponseEntity readyToKakaoPay(@RequestParam("order_id")long orderId){
        Order order = orderService.verifyPaymentStatus(orderId);
        return ResponseEntity.ok(paymentService.kakaoPayReady(orderId,order.getPrice()));
    }

    /**
     * 결제 성공
     */
    @GetMapping("/success")
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken,
                                          @RequestParam("order_id") long orderId) {

        KakaoApproveResponse kakaoApprove = paymentService.approveResponse(pgToken,orderId);
        OrderPatchDto orderPatchDto = new OrderPatchDto();
        orderPatchDto.setOrderId(orderId);
        orderPatchDto.setPaymentStatus(Order.PaymentStatus.COMPLETED);
        orderPatchDto.setPaymentMethod(Order.PaymentMethod.KAKAO_PAY);
        orderService.updateOrder(orderPatchDto);
        return ResponseEntity.ok(kakaoApprove);
    }

    /**
     환불
     */
    @PostMapping("/refund")
    public ResponseEntity refund(@RequestParam("order_id")long orderId) {
        Order order = orderService.findOrder(orderId);
        KakaoCancelResponse kakaoCancelResponse = paymentService.kakaoCancel(orderId, order.getPrice());
        OrderPatchDto orderPatchDto = new OrderPatchDto();
        orderPatchDto.setOrderId(orderId);
        orderPatchDto.setPaymentStatus(Order.PaymentStatus.CANCEL);
        orderService.updateOrder(orderPatchDto);

        return ResponseEntity.ok(kakaoCancelResponse);
    }


    /**
     결제 진행 중 취소
     **/
    @GetMapping("/cancel")
    public void cancel() {
        throw new BusinessLogicException(ExceptionCode.PAY_CANCEL);
    }

    /**
      결제 실패
     **/
    @GetMapping("/fail")
    public void fail() {
        throw new BusinessLogicException(ExceptionCode.PAY_FAILED);
    }
}
