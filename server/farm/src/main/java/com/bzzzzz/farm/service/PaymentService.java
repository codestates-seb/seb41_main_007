package com.bzzzzz.farm.service;

import com.bzzzzz.farm.model.dto.payment.KakaoApproveResponse;
import com.bzzzzz.farm.model.dto.payment.KakaoCancelResponse;
import com.bzzzzz.farm.model.dto.payment.KakaoReadyResponse;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.model.entity.Payment;
import com.bzzzzz.farm.repository.OrderRepository;
import com.bzzzzz.farm.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {
    @Value("${payment.cid}")
    private String cid;

    @Value("${payment.admin_key}")
    private String admin_key;

    @Value("${payment.host}")
    private String host;

    @Value("${payment.url}")
    private String redirectUrl;

    private KakaoReadyResponse kakaoReady;

    private final PaymentRepository paymentRepository;

    private final OrderRepository orderRepository;

    /**
     결제요청
     **/
    public KakaoReadyResponse kakaoPayReady(long orderId, int price){
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", orderId);
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("item_name", "상품명");
        parameters.add("quantity", 1);
        parameters.add("total_amount", price);
        parameters.add("vat_amount", 0);
        parameters.add("tax_free_amount", 0);
        parameters.add("approval_url", redirectUrl+"/payment/success?order_id="+orderId); // 성공 시 redirect url
        parameters.add("cancel_url", redirectUrl+"/payment/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", redirectUrl+"/payment/fail"); // 실패 시 redirect url

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        kakaoReady = restTemplate.postForObject(
                host+"/ready", //post 요청 url
                requestEntity,
                KakaoReadyResponse.class);

        return kakaoReady;
    }

    /**
     * 결제 완료 승인
     */
    public KakaoApproveResponse approveResponse(String pgToken,long orderId) {
        // 카카오 요청
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoReady.getTid());
        parameters.add("partner_order_id", orderId);
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", pgToken);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();
        KakaoApproveResponse approveResponse = restTemplate.postForObject(
                host+"/approve",
                requestEntity,
                KakaoApproveResponse.class);

        //결제 테이블 저장
        Payment payment = new Payment();
        payment.setOrder(orderRepository.findById(orderId).get());
        payment.setTid(kakaoReady.getTid());
        paymentRepository.save(payment);

        return approveResponse;
    }

    /**
     * 결제 환불
     */
    public KakaoCancelResponse kakaoCancel(long orderId, int price) {
        Payment payment = paymentRepository.findByOrder(orderRepository.findById(orderId).get()).get();

        // 카카오페이 요청
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", payment.getTid());
        parameters.add("cancel_amount", price);
        parameters.add("cancel_tax_free_amount", 0);
        parameters.add("cancel_vat_amount", 0);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                host+"/cancel",
                requestEntity,
                KakaoCancelResponse.class);

        //결제 취소로 상태 변경
        payment.setPaymentStatus(Order.PaymentStatus.CANCEL);
        paymentRepository.save(payment);

        return cancelResponse;
    }

    /**
     카카오에서 요구하는 헤더값 생성 메소드
    **/
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();

        String auth = "KakaoAK " + admin_key;

        headers.set("Authorization", auth);
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return headers;
    }
}
