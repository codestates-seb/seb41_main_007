package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.CartMapper;
import com.bzzzzz.farm.model.dto.cart.CartPatchDto;
import com.bzzzzz.farm.model.dto.cart.CartPostDto;
import com.bzzzzz.farm.model.dto.cart.CartResponseDto;
import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.service.CartService;
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
@WebMvcTest(CartController.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(roles = "USER")
public class CartControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private CartService cartService;
    @MockBean
    private CartMapper cartMapper;
    @MockBean
    private ProductOptionService productOptionService;

    @Test
    @DisplayName("내 장바구니 보기")
    void getCarts() throws Exception {
        // given
        CartResponseDto cartResponseDto1 = CartResponseDto
                .builder()
                .cartId(1L)
                .quantity(1)
                .productId(1L)
                .productName("테스트제품1")
                .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                .productPrice(10000)
                .productOptionId(1L)
                .productOptionName("옵션1")
                .productOptionPrice(1000)
                .stock(30)
                .shippingCountry("국내 배송")
                .shippingMethod("설치서비스")
                .shippingPrice(3000)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();

        CartResponseDto cartResponseDto2 = CartResponseDto
                .builder()
                .cartId(2L)
                .quantity(1)
                .productId(2L)
                .productName("테스트제품2")
                .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                .productPrice(20000)
                .productOptionId(4L)
                .productOptionName("기본")
                .productOptionPrice(0)
                .stock(20)
                .shippingCountry("해외 배송")
                .shippingMethod("택배")
                .shippingPrice(20000)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();

        List<CartResponseDto> response = List.of(cartResponseDto1, cartResponseDto2);

        given(cartService.findCartsByMemberId(Mockito.anyLong())).willReturn(List.of());
        given(cartMapper.cartsToCartResponseDtos(Mockito.anyList())).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/carts")
                        .accept(MediaType.APPLICATION_JSON)
        );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].cartId").value(cartResponseDto1.getCartId()))
                .andExpect(jsonPath("$[0].quantity").value(cartResponseDto1.getQuantity()))
                .andExpect(jsonPath("$[0].productId").value(cartResponseDto1.getProductId()))
                .andExpect(jsonPath("$[0].productName").value(cartResponseDto1.getProductName()))
                .andExpect(jsonPath("$[0].photo").value(cartResponseDto1.getPhoto()))
                .andExpect(jsonPath("$[0].productPrice").value(cartResponseDto1.getProductPrice()))
                .andExpect(jsonPath("$[0].productOptionId").value(cartResponseDto1.getProductOptionId()))
                .andExpect(jsonPath("$[0].productOptionName").value(cartResponseDto1.getProductOptionName()))
                .andExpect(jsonPath("$[0].productOptionPrice").value(cartResponseDto1.getProductOptionPrice()))
                .andExpect(jsonPath("$[0].stock").value(cartResponseDto1.getStock()))
                .andExpect(jsonPath("$[0].shippingCountry").value(cartResponseDto1.getShippingCountry()))
                .andExpect(jsonPath("$[0].shippingMethod").value(cartResponseDto1.getShippingMethod()))
                .andExpect(jsonPath("$[0].shippingPrice").value(cartResponseDto1.getShippingPrice()))
                .andExpect(jsonPath("$[0].createdAt").isString())
                .andExpect(jsonPath("$[0].modifiedAt").isString())
                .andExpect(jsonPath("$[1].cartId").value(cartResponseDto2.getCartId()))
                .andExpect(jsonPath("$[1].quantity").value(cartResponseDto2.getQuantity()))
                .andExpect(jsonPath("$[1].productId").value(cartResponseDto2.getProductId()))
                .andExpect(jsonPath("$[1].productName").value(cartResponseDto2.getProductName()))
                .andExpect(jsonPath("$[1].photo").value(cartResponseDto2.getPhoto()))
                .andExpect(jsonPath("$[1].productPrice").value(cartResponseDto2.getProductPrice()))
                .andExpect(jsonPath("$[1].productOptionId").value(cartResponseDto2.getProductOptionId()))
                .andExpect(jsonPath("$[1].productOptionName").value(cartResponseDto2.getProductOptionName()))
                .andExpect(jsonPath("$[1].productOptionPrice").value(cartResponseDto2.getProductOptionPrice()))
                .andExpect(jsonPath("$[1].stock").value(cartResponseDto2.getStock()))
                .andExpect(jsonPath("$[1].shippingCountry").value(cartResponseDto2.getShippingCountry()))
                .andExpect(jsonPath("$[1].shippingMethod").value(cartResponseDto2.getShippingMethod()))
                .andExpect(jsonPath("$[1].shippingPrice").value(cartResponseDto2.getShippingPrice()))
                .andExpect(jsonPath("$[1].createdAt").isString())
                .andExpect(jsonPath("$[1].modifiedAt").isString())
                .andDo(document(
                        "getCarts",
                        preprocessResponse(prettyPrint()),
                        responseFields(List.of(
                                fieldWithPath("[*]").type(JsonFieldType.ARRAY).description("장바구니에 담긴 제품 목록"),
                                fieldWithPath("[*].cartId").type(JsonFieldType.NUMBER).description("장바구니 식별자"),
                                fieldWithPath("[*].quantity").type(JsonFieldType.NUMBER).description("장바구니에 담긴 제품 갯수"),
                                fieldWithPath("[*].productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                fieldWithPath("[*].productName").type(JsonFieldType.STRING).description("제품명"),
                                fieldWithPath("[*].photo").type(JsonFieldType.STRING).description("제품 썸네일 사진"),
                                fieldWithPath("[*].productPrice").type(JsonFieldType.NUMBER).description("제품 가격"),
                                fieldWithPath("[*].productOptionId").type(JsonFieldType.NUMBER).description("옵션 식별자"),
                                fieldWithPath("[*].productOptionName").type(JsonFieldType.STRING).description("옵션명"),
                                fieldWithPath("[*].productOptionPrice").type(JsonFieldType.NUMBER).description("옵션 가격"),
                                fieldWithPath("[*].stock").type(JsonFieldType.NUMBER).description("옵션 재고"),
                                fieldWithPath("[*].shippingCountry").type(JsonFieldType.STRING).description("국내/해외 배송여부"),
                                fieldWithPath("[*].shippingMethod").type(JsonFieldType.STRING).description("배송 방법"),
                                fieldWithPath("[*].shippingPrice").type(JsonFieldType.NUMBER).description("배송비"),
                                fieldWithPath("[*].createdAt").type(JsonFieldType.STRING).description("장바구니에 담은 일자"),
                                fieldWithPath("[*].modifiedAt").type(JsonFieldType.STRING).description("수정 일자")
                        ))
                ));
    }

    @Test
    @DisplayName("장바구니에 제품 담기")
    void postCart() throws Exception {
//         given
        CartPostDto request = new CartPostDto(1L, 1);

        given(productOptionService.findVerifiedProductOption(Mockito.anyLong())).willReturn(new ProductOption());
        given(cartService.createCartProduct(Mockito.anyLong(), Mockito.any(ProductOption.class), Mockito.anyInt())).willReturn(new Cart());

        String content = gson.toJson(request);

//         when
        ResultActions actions = mockMvc.perform(
                post("/carts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "postCart",
                        preprocessRequest(prettyPrint()),
                        requestFields(List.of(
                                fieldWithPath("productOptionId").type(JsonFieldType.NUMBER).description("장바구니에 추가할 제품의 옵션 식별자"),
                                fieldWithPath("quantity").type(JsonFieldType.NUMBER).description("추가할 수량")
                        ))
                ));
    }

    @Test
    @DisplayName("장바구니에 담긴 제품 수량 수정")
    void patchCart() throws Exception {
        // given
        CartPatchDto request = new CartPatchDto(1L, -1);

        doNothing().when(cartService).verifyAuthority(Mockito.anyLong(), Mockito.anyLong());
        given(cartService.updateCart(Mockito.anyLong(), Mockito.anyInt())).willReturn(new Cart());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/carts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "patchCart",
                        preprocessRequest(prettyPrint()),
                        requestFields(List.of(
                                fieldWithPath("cartId").type(JsonFieldType.NUMBER).description("장바구니의 식별자"),
                                fieldWithPath("quantity").type(JsonFieldType.NUMBER).description("변경할 수량 (기존 + quantity 방식, 음수가능, 계산시 대상의 수량이 0이하일시 삭제됨)")
                        ))
                ));
    }

    @Test
    @DisplayName("장바구니에서 제품을 삭제")
    void deleteCart() throws Exception {
        // given
        long cartId = 1L;

        doNothing().when(cartService).verifyAuthority(Mockito.anyLong(), Mockito.anyLong());
        doNothing().when(cartService).deleteCart(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/carts/{cart-id}", cartId)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteCart",
                        pathParameters(parameterWithName("cart-id").description("삭제할 대상의 식별자"))
                ));
    }
}
