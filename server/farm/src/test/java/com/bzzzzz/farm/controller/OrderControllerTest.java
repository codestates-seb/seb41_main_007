package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.config.ParcelTrackingConfig;
import com.bzzzzz.farm.model.dto.ParcelTrackingResponseDto;
import com.bzzzzz.farm.model.dto.order.*;
import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.model.entity.OrderProduct;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.service.OrderService;
import com.bzzzzz.farm.service.ProductOptionService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@WebMvcTest(OrderController.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(roles = {"USER", "ADMIN"})
public class OrderControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private OrderService orderService;
    @MockBean
    private ProductOptionService productOptionService;
    @MockBean
    private ParcelTrackingConfig parcelTrackingConfig;

    @Test
    @DisplayName("주문서 작성")
    void postOrder() throws Exception {
        // given
        OrderProductPostDto orderProductPostDto1 = new OrderProductPostDto();
        orderProductPostDto1.setProductOptionId(1L);
        orderProductPostDto1.setQuantity(2);

        OrderProductPostDto orderProductPostDto2 = new OrderProductPostDto();
        orderProductPostDto2.setProductOptionId(2L);
        orderProductPostDto2.setQuantity(5);

        OrderPostDto request = OrderPostDto
                .builder()
                .address("대한민국 어딘가")
                .name("김아무개")
                .phone("010-1234-1234")
                .orderProductPostDtos(List.of(orderProductPostDto1, orderProductPostDto2))
                .build();

        Order order = new Order();
        order.setOrderId(1L);

        given(productOptionService.findVerifiedProductOption(Mockito.anyLong())).willReturn(new ProductOption());
        given(orderService.createOrder(Mockito.any(OrderPostDto.class))).willReturn(order);

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                post("/orders")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data").value(order.getOrderId()))
                .andDo(document(
                        "postOrder",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(List.of(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("받는사람"),
                                fieldWithPath("address").type(JsonFieldType.STRING).description("받는사람 주소"),
                                fieldWithPath("phone").type(JsonFieldType.STRING).description("받는사람 전화번호"),
                                fieldWithPath("orderProductPostDtos").type(JsonFieldType.ARRAY).description("주문 목록"),
                                fieldWithPath("orderProductPostDtos[*].productOptionId").type(JsonFieldType.NUMBER).description("제품 옵션 식별자"),
                                fieldWithPath("orderProductPostDtos[*].quantity").type(JsonFieldType.NUMBER).description("수량")
                        )),
                        responseFields(fieldWithPath("data").type(JsonFieldType.NUMBER).description("생성된 주문서 번호"))
                ));
    }

    @Test
    @DisplayName("주문 취소")
    void cancelOrder() throws Exception {
        // given
        doNothing().when(orderService).verifyAuthority(Mockito.anyLong(), Mockito.anyLong());
        doNothing().when(orderService).cancelOrder(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/orders/{order-id}", 1L)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "cancelOrder",
                        preprocessRequest(prettyPrint()),
                        pathParameters(parameterWithName("order-id").description("주문서 식별자"))
                ));
    }

    @Test
    @DisplayName("주문 상태변경 및 취소(어드민이 수동변경 시 사용)")
    void patchOrder() throws Exception {
        // given
        OrderPatchDto request = new OrderPatchDto();
        request.setOrderId(1L);
        request.setPaymentStatus(Order.PaymentStatus.COMPLETED);
        request.setPaymentMethod(Order.PaymentMethod.BANK_BOOK);

        given(orderService.updateOrder(Mockito.any(OrderPatchDto.class))).willReturn(new Order());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/orders")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(request.getOrderId()))
                .andDo(document(
                        "patchOrder",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(List.of(
                                fieldWithPath("orderId").type(JsonFieldType.NUMBER).description("주문 식별자"),
                                fieldWithPath("paymentMethod").type(JsonFieldType.STRING).description("결재 방법 (선택사항)\n" +
                                        "ENUM : \n" +
                                        "UNDETERMINED(1, \"미정\"),\n" +
                                        "BANK_BOOK(2, \"무통장입금\"),\n" +
                                        "KAKAO_PAY(3, \"카카오페이\"),\n" +
                                        "CREDIT_CARD(4, \"신용카드\")"),
                                fieldWithPath("paymentStatus").type(JsonFieldType.STRING).description("결재 상태 (선택사항)\n" +
                                        "ENUM : \n" +
                                        "NOT_PAYMENT(1, \"결제 전\"),\n" +
                                        "COMPLETED(2, \"결제 완료\"),\n" +
                                        "CANCEL(3, \"결제 취소\")")
                        )),
                        responseFields(fieldWithPath("data").description("주문 식별자"))
                ));
    }

    @Test
    @DisplayName("특정 주문서 상세보기")
    void getOrder() throws Exception {
        // given
        OrderProductResponseDto oP1 = OrderProductResponseDto
                .builder()
                .orderProductId(1L)
                .productId(1L)
                .productName("호미")
                .productPrice(10000)
                .productOptionId(1L)
                .productOptionName("기본")
                .quantity(3)
                .productOptionPrice(0)
                .shippingCountry(Product.ShippingCountry.FOREIGN_COUNTRY.getShippingType())
                .shippingMethod(Product.ShippingMethod.PARCEL_SERVICE.getShippingMethod())
                .shippingPrice(3000)
                .waybillNumber("123456789")
                .orderStatus(OrderProduct.OrderStatus.SHIPMENT_IN_PROGRESS.getStatus())
                .build();

        OrderProductResponseDto oP2 = OrderProductResponseDto
                .builder()
                .orderProductId(2L)
                .productId(2L)
                .productName("곡괭이")
                .productPrice(40000)
                .productOptionId(2L)
                .productOptionName("+3강")
                .quantity(1)
                .productOptionPrice(30000)
                .shippingCountry(Product.ShippingCountry.FOREIGN_COUNTRY.getShippingType())
                .shippingMethod(Product.ShippingMethod.PARCEL_SERVICE.getShippingMethod())
                .shippingPrice(0)
                .waybillNumber("123456789")
                .orderStatus(OrderProduct.OrderStatus.SHIPMENT_IN_PROGRESS.getStatus())
                .build();

        int totalPrice = oP1.getShippingPrice() + (oP1.getProductPrice() + oP1.getProductOptionPrice()) * oP1.getQuantity()
                + oP2.getShippingPrice() + (oP2.getProductPrice() + oP2.getProductOptionPrice()) * oP2.getQuantity();

        OrderResponseDto response = OrderResponseDto
                .builder()
                .orderId(1L)
                .memberId(1L)
                .memberName("김농부 (주문한사람)")
                .name("이어부 (받는사람)")
                .address("대한민국 어딘가")
                .phone("010-1234-1234")
                .price(totalPrice)
                .paymentMethod(Order.PaymentMethod.KAKAO_PAY.getMethod())
                .paymentStatus(Order.PaymentStatus.COMPLETED.getStatus())
                .orderProductResponseDtos(List.of(oP1, oP2))
                .createdAt(LocalDateTime.now())
                .build();

        doNothing().when(orderService).verifyAuthority(Mockito.anyLong(), Mockito.anyLong());
        given(orderService.findOrder(Mockito.anyLong())).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/orders/{order-id}", response.getOrderId())
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value(response.getOrderId()))
                .andExpect(jsonPath("$.memberId").value(response.getMemberId()))
                .andExpect(jsonPath("$.memberName").value(response.getMemberName()))
                .andExpect(jsonPath("$.name").value(response.getName()))
                .andExpect(jsonPath("$.address").value(response.getAddress()))
                .andExpect(jsonPath("$.phone").value(response.getPhone()))
                .andExpect(jsonPath("$.price").value(response.getPrice()))
                .andExpect(jsonPath("$.paymentMethod").value(response.getPaymentMethod()))
                .andExpect(jsonPath("$.paymentStatus").value(response.getPaymentStatus()))
                .andExpect(jsonPath("$.createdAt").isString())
                .andExpect(jsonPath("$.orderProductResponseDtos").isArray())
                .andDo(document(
                        "getOrder",
                        preprocessResponse(prettyPrint()),
                        pathParameters(parameterWithName("order-id").description("주문서 식별자")),
                        responseFields(List.of(
                                fieldWithPath("orderId").type(JsonFieldType.NUMBER).description("주문서 식별자"),
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("주문한 회원 식별자"),
                                fieldWithPath("memberName").type(JsonFieldType.STRING).description("주문한 회원 이름"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("받는사람 이름"),
                                fieldWithPath("address").type(JsonFieldType.STRING).description("받는사람 주소"),
                                fieldWithPath("phone").type(JsonFieldType.STRING).description("받는사람 전화번호"),
                                fieldWithPath("price").type(JsonFieldType.NUMBER).description("주문 총 금액"),
                                fieldWithPath("paymentMethod").type(JsonFieldType.STRING).description("결제 방법"),
                                fieldWithPath("paymentStatus").type(JsonFieldType.STRING).description("결제 상태"),
                                fieldWithPath("createdAt").type(JsonFieldType.STRING).description("주문한 날짜"),
                                fieldWithPath("orderProductResponseDtos").type(JsonFieldType.ARRAY).description("주문한 제품 상세정보"),
                                fieldWithPath("orderProductResponseDtos[*].orderProductId").type(JsonFieldType.NUMBER).description("OrderProduct 식별자"),
                                fieldWithPath("orderProductResponseDtos[*].productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                fieldWithPath("orderProductResponseDtos[*].productName").type(JsonFieldType.STRING).description("제품명"),
                                fieldWithPath("orderProductResponseDtos[*].productPrice").type(JsonFieldType.NUMBER).description("제품가격"),
                                fieldWithPath("orderProductResponseDtos[*].productOptionId").type(JsonFieldType.NUMBER).description("제품 옵션 식별자"),
                                fieldWithPath("orderProductResponseDtos[*].productOptionName").type(JsonFieldType.STRING).description("제품 옵션명"),
                                fieldWithPath("orderProductResponseDtos[*].quantity").type(JsonFieldType.NUMBER).description("주문수량"),
                                fieldWithPath("orderProductResponseDtos[*].productOptionPrice").type(JsonFieldType.NUMBER).description("제품옵션가격"),
                                fieldWithPath("orderProductResponseDtos[*].shippingCountry").type(JsonFieldType.STRING).description("국내/해외 배송 여부"),
                                fieldWithPath("orderProductResponseDtos[*].shippingMethod").type(JsonFieldType.STRING).description("배송방법"),
                                fieldWithPath("orderProductResponseDtos[*].shippingPrice").type(JsonFieldType.NUMBER).description("배송비"),
                                fieldWithPath("orderProductResponseDtos[*].waybillNumber").type(JsonFieldType.STRING).description("운송장 번호"),
                                fieldWithPath("orderProductResponseDtos[*].orderStatus").type(JsonFieldType.STRING).description("주문 상태")
                        ))
                ));
    }

    @Test
    @DisplayName("배송조회")
    void getParcelLocation() throws Exception {
        // given

        ParcelTrackingResponseDto step1 = new ParcelTrackingResponseDto("상품인수", "2022-11-24 18:24", "보내시는 고객님으로부터 상품을 인수받았습니다", "[집화]굿투럭중앙");
        ParcelTrackingResponseDto step2 = new ParcelTrackingResponseDto("상품이동중", "2022-11-25 03:43", "배달지역으로 상품이 이동중입니다.", "대전HUB");
        ParcelTrackingResponseDto step3 = new ParcelTrackingResponseDto("배달지도착", "2022-11-25 11:26", "고객님의 상품이 배달지에 도착하였습니다. (배달예정:홍길동 010-1111-1111)", "울산북");
        ParcelTrackingResponseDto step4 = new ParcelTrackingResponseDto("배달출발", "2022-11-25 11:45", "고객님의 상품을 배달할 예정입니다.(14∼16시) (배달담당:홍길동 010-1111-1111)", "울산북구송정");
        ParcelTrackingResponseDto step5 = new ParcelTrackingResponseDto("배달완료", "2022-11-25 16:04", "고객님의 상품이 배달완료 되었습니다. (담당사원:홍길동 010-1111-1111)", "울산북구송정");

        List<ParcelTrackingResponseDto> response = List.of(step1, step2, step3, step4, step5);

        given(parcelTrackingConfig.traceAParcel(Mockito.anyLong())).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/orders/parcels/{waybill-number}", 134534534)
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andDo(document(
                        "getParcelLocation",
                        preprocessResponse(prettyPrint()),
                        pathParameters(parameterWithName("waybill-number").description("운송장 번호")),
                        responseFields(List.of(
                                fieldWithPath("[*].step").type(JsonFieldType.STRING).description("단계"),
                                fieldWithPath("[*].dateTime").type(JsonFieldType.STRING).description("처리날짜"),
                                fieldWithPath("[*].status").type(JsonFieldType.STRING).description("상품상태"),
                                fieldWithPath("[*].branch").type(JsonFieldType.STRING).description("담당점포")
                        ))
                ));
    }
}
