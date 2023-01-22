package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.CartMapper;
import com.bzzzzz.farm.model.dto.IdRequestDto;
import com.bzzzzz.farm.model.dto.cart.CartProductPatchDto;
import com.bzzzzz.farm.model.dto.cart.CartProductPostDto;
import com.bzzzzz.farm.model.dto.cart.CartProductResponseDto;
import com.bzzzzz.farm.model.dto.cart.CartResponseDto;
import com.bzzzzz.farm.model.entity.Cart;
import com.bzzzzz.farm.model.entity.CartProduct;
import com.bzzzzz.farm.service.CartService;
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

    @Test
    @DisplayName("내 장바구니 보기")
    void getCart() throws Exception {
        // given
        CartProductResponseDto cartProductResponseDto1 = CartProductResponseDto
                .builder()
                .cartProductId(1L)
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

        CartProductResponseDto cartProductResponseDto2 = CartProductResponseDto
                .builder()
                .cartProductId(2L)
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

        CartResponseDto response = CartResponseDto
                .builder()
                .cartProductResponseDtos(List.of(cartProductResponseDto1, cartProductResponseDto2))
                .build();

        given(cartService.findCart(Mockito.anyLong())).willReturn(new Cart());
        given(cartMapper.cartToCartResponseDto(Mockito.any(Cart.class))).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/carts/{cart-id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cartProductResponseDtos").isArray())
                .andExpect(jsonPath("$.cartProductResponseDtos[0].cartProductId").value(cartProductResponseDto1.getCartProductId()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].quantity").value(cartProductResponseDto1.getQuantity()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].productId").value(cartProductResponseDto1.getProductId()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].productName").value(cartProductResponseDto1.getProductName()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].photo").value(cartProductResponseDto1.getPhoto()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].productPrice").value(cartProductResponseDto1.getProductPrice()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].productOptionId").value(cartProductResponseDto1.getProductOptionId()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].productOptionName").value(cartProductResponseDto1.getProductOptionName()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].productOptionPrice").value(cartProductResponseDto1.getProductOptionPrice()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].stock").value(cartProductResponseDto1.getStock()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].shippingCountry").value(cartProductResponseDto1.getShippingCountry()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].shippingMethod").value(cartProductResponseDto1.getShippingMethod()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].shippingPrice").value(cartProductResponseDto1.getShippingPrice()))
                .andExpect(jsonPath("$.cartProductResponseDtos[0].createdAt").isString())
                .andExpect(jsonPath("$.cartProductResponseDtos[0].modifiedAt").isString())
                .andExpect(jsonPath("$.cartProductResponseDtos[1].cartProductId").value(cartProductResponseDto2.getCartProductId()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].quantity").value(cartProductResponseDto2.getQuantity()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].productId").value(cartProductResponseDto2.getProductId()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].productName").value(cartProductResponseDto2.getProductName()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].photo").value(cartProductResponseDto2.getPhoto()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].productPrice").value(cartProductResponseDto2.getProductPrice()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].productOptionId").value(cartProductResponseDto2.getProductOptionId()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].productOptionName").value(cartProductResponseDto2.getProductOptionName()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].productOptionPrice").value(cartProductResponseDto2.getProductOptionPrice()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].stock").value(cartProductResponseDto2.getStock()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].shippingCountry").value(cartProductResponseDto2.getShippingCountry()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].shippingMethod").value(cartProductResponseDto2.getShippingMethod()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].shippingPrice").value(cartProductResponseDto2.getShippingPrice()))
                .andExpect(jsonPath("$.cartProductResponseDtos[1].createdAt").isString())
                .andExpect(jsonPath("$.cartProductResponseDtos[1].modifiedAt").isString())
                .andDo(document(
                        "getCart",
                        preprocessResponse(prettyPrint()),
                        pathParameters(parameterWithName("cart-id").description("장바구니 식별자 (없어질수도 있음)")),
                        responseFields(List.of(
                                fieldWithPath("cartProductResponseDtos").type(JsonFieldType.ARRAY).description("장바구니에 담긴 제품 목록"),
                                fieldWithPath("cartProductResponseDtos[*].cartProductId").type(JsonFieldType.NUMBER).description("장바구니제품 식별자"),
                                fieldWithPath("cartProductResponseDtos[*].quantity").type(JsonFieldType.NUMBER).description("장바구니제품 갯수"),
                                fieldWithPath("cartProductResponseDtos[*].productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                fieldWithPath("cartProductResponseDtos[*].productName").type(JsonFieldType.STRING).description("제품명"),
                                fieldWithPath("cartProductResponseDtos[*].photo").type(JsonFieldType.STRING).description("제품 썸네일 사진"),
                                fieldWithPath("cartProductResponseDtos[*].productPrice").type(JsonFieldType.NUMBER).description("제품 가격"),
                                fieldWithPath("cartProductResponseDtos[*].productOptionId").type(JsonFieldType.NUMBER).description("옵션 식별자"),
                                fieldWithPath("cartProductResponseDtos[*].productOptionName").type(JsonFieldType.STRING).description("옵션명"),
                                fieldWithPath("cartProductResponseDtos[*].productOptionPrice").type(JsonFieldType.NUMBER).description("옵션 가격"),
                                fieldWithPath("cartProductResponseDtos[*].stock").type(JsonFieldType.NUMBER).description("옵션 재고"),
                                fieldWithPath("cartProductResponseDtos[*].shippingCountry").type(JsonFieldType.STRING).description("국내/해외 배송여부"),
                                fieldWithPath("cartProductResponseDtos[*].shippingMethod").type(JsonFieldType.STRING).description("배송 방법"),
                                fieldWithPath("cartProductResponseDtos[*].shippingPrice").type(JsonFieldType.NUMBER).description("배송비"),
                                fieldWithPath("cartProductResponseDtos[*].createdAt").type(JsonFieldType.STRING).description("장바구니에 담은 일자"),
                                fieldWithPath("cartProductResponseDtos[*].modifiedAt").type(JsonFieldType.STRING).description("수정 일자")
                        ))
                ));
    }

    @Test
    @DisplayName("장바구니에 제품 담기")
    void postCartProduct() throws Exception {
        // given
        CartProductPostDto request = new CartProductPostDto(1L, 1L, 1);

        given(cartMapper.cartProductPostDtoToCartProduct(Mockito.any(CartProductPostDto.class))).willReturn(new CartProduct());
        doNothing().when(cartService).createCartProduct(Mockito.any(CartProduct.class));

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                post("/carts/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data").value(request.getCartId()))
                .andDo(document(
                        "postCartProduct",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(List.of(
                                fieldWithPath("cartId").type(JsonFieldType.NUMBER).description("장바구니 식별자 (없어질수있음)"),
                                fieldWithPath("productOptionId").type(JsonFieldType.NUMBER).description("장바구니에 추가할 제품의 옵션 식별자"),
                                fieldWithPath("quantity").type(JsonFieldType.NUMBER).description("추가할 수량")
                        )),
                        responseFields(fieldWithPath("data").type(JsonFieldType.NUMBER).description("장바구니 식별자 (없어질수있음)"))
                ));
    }

    @Test
    @DisplayName("장바구니에 담긴 제품 수량 수정")
    void patchCartProduct() throws Exception {
        // given
        CartProductPatchDto request = new CartProductPatchDto(1L, 1L, -1);

        doNothing().when(cartService).updateCartProduct(Mockito.anyLong(), Mockito.anyInt());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/carts/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(request.getCartId()))
                .andDo(document(
                        "patchCartProduct",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(List.of(
                                fieldWithPath("cartProductId").type(JsonFieldType.NUMBER).description("변경할 대상의 식별자"),
                                fieldWithPath("cartId").type(JsonFieldType.NUMBER).description("대상이 속한 장바구니의 식별자"),
                                fieldWithPath("quantity").type(JsonFieldType.NUMBER).description("변경할 수량 (기존 + quantity 방식, 음수가능, 계산시 대상의 수량이 0이하일시 삭제됨)")
                        )),
                        responseFields(fieldWithPath("data").type(JsonFieldType.NUMBER).description("장바구니 식별자"))
                ));
    }

    @Test
    @DisplayName("장바구니에서 제품을 삭제")
    void deleteCartProduct() throws Exception {
        // given
        IdRequestDto request = new IdRequestDto();
        request.setId(1L);

        doNothing().when(cartService).deleteCartProduct(Mockito.anyLong());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/carts/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteCartProduct",
                        preprocessRequest(prettyPrint()),
                        requestFields(fieldWithPath("id").type(JsonFieldType.NUMBER).description("삭제할 제품 식별자"))
                ));
    }
}
