package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.payment.KakaoApproveResponse;
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
    /**
     결제요청
     **/
    @PostMapping("/ready")
    public ResponseEntity readyToKakaoPay(@RequestParam("total_price")int price){
        return ResponseEntity.ok(paymentService.kakaoPayReady(price));
    }

    /**
     * 결제 성공
     */
    @GetMapping("/success")
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken) {

        KakaoApproveResponse kakaoApprove = paymentService.approveResponse(pgToken);

        return ResponseEntity.ok(kakaoApprove);
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
