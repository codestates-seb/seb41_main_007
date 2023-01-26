package com.bzzzzz.farm.service;

import com.bzzzzz.farm.model.dto.payment.KakaoApproveResponse;
import com.bzzzzz.farm.model.dto.payment.KakaoReadyResponse;
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
    private static final String cid = "TC0ONETIME";  //가맹점 임시 코드

    @Value("${payment.admin_key}")
    private String admin_key;  //카카오 어플리케이션 어드민 키
    private final String host = "https://kapi.kakao.com/v1/payment"; // host url
    private KakaoReadyResponse kakaoReady;

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
        parameters.add("approval_url", "http://localhost:8080/payment/success?order_id="+orderId); // 성공 시 redirect url
        parameters.add("cancel_url", "http://localhost:8080/payment/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", "http://localhost:8080/payment/fail"); // 실패 시 redirect url

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
        return approveResponse;
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
