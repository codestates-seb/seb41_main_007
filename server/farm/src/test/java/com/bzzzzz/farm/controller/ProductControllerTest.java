package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.product.*;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.service.LikeService;
import com.bzzzzz.farm.service.ProductCategoryService;
import com.bzzzzz.farm.service.ProductOptionService;
import com.bzzzzz.farm.service.ProductService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@WebMvcTest(ProductController.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(roles = {"USER", "ADMIN"})
public class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private ProductService productService;
    @MockBean
    private LikeService likeService;
    @MockBean
    private ProductCategoryService productCategoryService;
    @MockBean
    private ProductOptionService productOptionService;

    @Test
    @DisplayName("?????? ??????")
    void postProduct() throws Exception {
        // given
        Product product = new Product();
        product.setProductId(1L);
        ProductPostDto request = ProductPostDto
                .builder()
                .name("???????????????")
                .price(30000)
                .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                .brand("??????????????????")
                .body("?????? ????????? ???????????????")
                .description("????????? ????????? ???????????????")
                .shippingCountry("KOREA")
                .shippingMethod("PARCEL_SERVICE")
                .shippingPrice(3000)
                .productCategoryPostDtos(List.of(new ProductCategoryPostDto(1L)))
                .productOptionPostDtos(List.of(new ProductOptionPostDto("????????????", 5000, 100)))
                .build();

        given(productService.createProduct(Mockito.any(ProductPostDto.class))).willReturn(product);
        given(productCategoryService.createProductCategory(Mockito.any(ProductCategoryPostDto.class))).willReturn(ProductCategoryResponseDto.builder().build());

        doNothing().when(productOptionService).createProductOption(Mockito.any(ProductOptionPostDto.class));

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                post("/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data").value(product.getProductId()))
                .andDo(document(
                        "postProduct",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                        fieldWithPath("photo").type(JsonFieldType.STRING).description("?????? ????????? ?????? URL"),
                                        fieldWithPath("brand").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
                                        fieldWithPath("description").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
                                        fieldWithPath("shippingCountry").type(JsonFieldType.STRING).description(
                                                "??????/?????? ?????? ??????\n" +
                                                        "ENUM ???????????? ????????? ?????? ?????? ???????????????.\n" +
                                                        "KOREA(1, \"?????? ??????\"),\n" +
                                                        "FOREIGN_COUNTRY(2, \"?????? ??????\")"),
                                        fieldWithPath("shippingMethod").type(JsonFieldType.STRING).description(
                                                "?????? ??????" +
                                                        "ENUM ???????????? ????????? ?????? ?????? ???????????????.\n" +
                                                        "PARCEL_SERVICE(1, \"??????\"),\n" +
                                                        "INSTALLATION_SERVICE(2, \"???????????????\")"),
                                        fieldWithPath("shippingPrice").type(JsonFieldType.NUMBER).description("?????????"),
                                        fieldWithPath("productCategoryPostDtos").type(JsonFieldType.ARRAY).description("????????? ????????? ???????????? (1??? ?????? ??????)"),
                                        fieldWithPath("productCategoryPostDtos[*].categoryId").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
                                        fieldWithPath("productOptionPostDtos").type(JsonFieldType.ARRAY).description("?????? ?????? ?????? (1??? ?????? ??????)"),
                                        fieldWithPath("productOptionPostDtos[*].productOptionName").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("productOptionPostDtos[*].price").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                        fieldWithPath("productOptionPostDtos[*].stock").type(JsonFieldType.NUMBER).description("?????? ??????")
                                )
                        ),
                        responseFields(fieldWithPath("data").description("????????? ?????? ?????????"))
                ))
                .andReturn();
    }

    @Test
    @DisplayName("?????? ???????????? ??????")
    void getProduct() throws Exception {
        // given
        long productId = 1L;

        ProductDetailResponseDto response = ProductDetailResponseDto
                .builder()
                .productId(productId)
                .name("???????????????")
                .price(10000)
                .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                .shippingCountry("?????? ??????")
                .shippingMethod("??????")
                .shippingPrice(3000)
                .body("????????? ?????? ?????? ???????????????.")
                .description("????????? ?????? ????????? ???????????????.")
                .brand("??????????????????")
                .productStatus("?????? ???")
                .viewCount(200)
                .likeCount(30)
                .soldCount(10)
                .isLiked(false)
                .rating(5.0)
                .productCategoryResponseDtos(
                        List.of(
                                ProductCategoryResponseDto
                                        .builder()
                                        .productCategoryId(1L)
                                        .categoryId(1L)
                                        .name("?????????????????????")
                                        .build()))
                .productOptionResponseDtos(
                        List.of(
                                ProductOptionResponseDto
                                        .builder()
                                        .productOptionId(1L)
                                        .productOptionName("????????? ??????")
                                        .price(5000)
                                        .stock(100)
                                        .build()))
                .build();

        given(productService.findProduct(Mockito.anyLong(), Mockito.anyBoolean())).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/products/{product-id}", productId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(response.getProductId()))
                .andExpect(jsonPath("$.name").value(response.getName()))
                .andExpect(jsonPath("$.price").value(response.getPrice()))
                .andExpect(jsonPath("$.photo").value(response.getPhoto()))
                .andExpect(jsonPath("$.shippingCountry").value(response.getShippingCountry()))
                .andExpect(jsonPath("$.shippingMethod").value(response.getShippingMethod()))
                .andExpect(jsonPath("$.shippingPrice").value(response.getShippingPrice()))
                .andExpect(jsonPath("$.body").value(response.getBody()))
                .andExpect(jsonPath("$.description").value(response.getDescription()))
                .andExpect(jsonPath("$.brand").value(response.getBrand()))
                .andExpect(jsonPath("$.productStatus").value(response.getProductStatus()))
                .andExpect(jsonPath("$.viewCount").value(response.getViewCount()))
                .andExpect(jsonPath("$.likeCount").value(response.getLikeCount()))
                .andExpect(jsonPath("$.soldCount").value(response.getSoldCount()))
                .andExpect(jsonPath("$.isLiked").value(response.getIsLiked()))
                .andExpect(jsonPath("$.rating").value(response.getRating()))
                .andExpect(jsonPath("$.productCategoryResponseDtos").isArray())
                .andExpect(jsonPath("$.productCategoryResponseDtos[0].productCategoryId").value(response.getProductCategoryResponseDtos().get(0).getProductCategoryId()))
                .andExpect(jsonPath("$.productCategoryResponseDtos[0].categoryId").value(response.getProductCategoryResponseDtos().get(0).getCategoryId()))
                .andExpect(jsonPath("$.productCategoryResponseDtos[0].name").value(response.getProductCategoryResponseDtos().get(0).getName()))
                .andExpect(jsonPath("$.productOptionResponseDtos").isArray())
                .andExpect(jsonPath("$.productOptionResponseDtos[0].productOptionId").value(response.getProductOptionResponseDtos().get(0).getProductOptionId()))
                .andExpect(jsonPath("$.productOptionResponseDtos[0].productOptionName").value(response.getProductOptionResponseDtos().get(0).getProductOptionName()))
                .andExpect(jsonPath("$.productOptionResponseDtos[0].price").value(response.getProductOptionResponseDtos().get(0).getPrice()))
                .andExpect(jsonPath("$.productOptionResponseDtos[0].stock").value(response.getProductOptionResponseDtos().get(0).getStock()))
                .andDo(document(
                        "getProduct",
                        preprocessResponse(prettyPrint()),
                        pathParameters(parameterWithName("product-id").description("?????? ?????????")),
                        responseFields(List.of(
                                fieldWithPath("productId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("?????????"),
                                fieldWithPath("price").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("photo").type(JsonFieldType.STRING).description("?????? ????????? ?????? URL"),
                                fieldWithPath("shippingCountry").type(JsonFieldType.STRING).description("??????/?????? ?????? ??????"),
                                fieldWithPath("shippingMethod").type(JsonFieldType.STRING).description("?????? ??????"),
                                fieldWithPath("shippingPrice").type(JsonFieldType.NUMBER).description("?????????"),
                                fieldWithPath("body").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
                                fieldWithPath("description").type(JsonFieldType.STRING).description("?????? ?????? ??????"),
                                fieldWithPath("brand").type(JsonFieldType.STRING).description("?????????"),
                                fieldWithPath("productStatus").type(JsonFieldType.STRING).description("?????? ??????"),
                                fieldWithPath("viewCount").type(JsonFieldType.NUMBER).description("?????????"),
                                fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("?????????"),
                                fieldWithPath("soldCount").type(JsonFieldType.NUMBER).description("?????????"),
                                fieldWithPath("isLiked").type(JsonFieldType.BOOLEAN).description("?????? ???????????? ??????(????????? ?????? ??????)"),
                                fieldWithPath("rating").type(JsonFieldType.NUMBER).description("????????? ?????? ??????"),
                                fieldWithPath("productOptionResponseDtos").type(JsonFieldType.ARRAY).description("?????? ?????? ??????"),
                                fieldWithPath("productOptionResponseDtos[*].productOptionId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                fieldWithPath("productOptionResponseDtos[*].productOptionName").type(JsonFieldType.STRING).description("?????????"),
                                fieldWithPath("productOptionResponseDtos[*].price").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("productOptionResponseDtos[*].stock").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                fieldWithPath("productCategoryResponseDtos").type(JsonFieldType.ARRAY).description("???????????? ??????(????????? ?????????)"),
                                fieldWithPath("productCategoryResponseDtos[*].productCategoryId").type(JsonFieldType.NUMBER).description("?????? ???????????? ?????????"),
                                fieldWithPath("productCategoryResponseDtos[*].categoryId").type(JsonFieldType.NUMBER).description("???????????? ?????????(?????? ????????????)"),
                                fieldWithPath("productCategoryResponseDtos[*].name").type(JsonFieldType.STRING).description("???????????????(?????? ????????????)")
                        ))
                ))
                .andReturn();
    }

    @Test
    @DisplayName("?????? ???????????? ??????(??????)")
    void getProducts() throws Exception {
        // given
        List<ProductSimpleResponseDto> response = new ArrayList<>();
        for (long i = 40; i >= 1; i--) {
            response.add(new ProductSimpleResponseDto(
                    i,
                    "????????? ??????" + i,
                    30000,
                    "http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg",
                    "?????? ???",
                    5.0));
        }

        Page<ProductSimpleResponseDto> productPage = new PageImpl<>(
                response, PageRequest.of(0, 40, Sort.by("productId").descending()), 1
        );

        given(productService.findProducts(
                Mockito.anyInt(),
                Mockito.anyInt(),
                Mockito.anyString(),
                Mockito.anyString(),
                Mockito.anyLong(),
                Mockito.anyString()
        )).willReturn(productPage);

        // when
        ResultActions actions = mockMvc.perform(
                get("/products?page=1&size=40&categoryId=0&sort=productId&order=descending&keyword=")
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.pageInfo.page").value(productPage.getNumber() + 1))
                .andExpect(jsonPath("$.pageInfo.size").value(productPage.getSize()))
                .andExpect(jsonPath("$.pageInfo.totalElements").value(productPage.getTotalElements()))
                .andExpect(jsonPath("$.pageInfo.totalPages").value(productPage.getTotalPages()))
                .andDo(document(
                        "getProducts",
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("????????? ????????? (????????? = 1) * ?????? ???????????? ????????? ?????? ?????? ?????? ???????????? *"),
                                parameterWithName("size").description("??? ???????????? ????????? ????????? ??? (????????? = 40)"),
                                parameterWithName("categoryId").description("?????? ??????????????? ?????? ???????????? ?????? ?????? ?????? ??????????????? ???????????? ??????"),
                                parameterWithName("sort").description("?????? ?????? = productId(?????????, ?????????), name(???????????????), price(?????????), brand(????????????), likeCount(?????????), soldCount(????????????), rating(?????????)"),
                                parameterWithName("order").description("?????? ?????? = descending(????????????, ?????????), ascending(????????????)"),
                                parameterWithName("keyword").description("????????? = ?????????, ??????, ?????????????????? ??????")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("?????? ?????????"),
                                        fieldWithPath("data[*].productId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("data[*].name").type(JsonFieldType.STRING).description("?????? ???"),
                                        fieldWithPath("data[*].price").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                        fieldWithPath("data[*].photo").type(JsonFieldType.STRING).description("?????? ????????? ?????? URL"),
                                        fieldWithPath("data[*].productStatus").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("data[*].rating").type(JsonFieldType.NUMBER).description("??????"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("????????? ??????"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("??? ???????????? ????????? ????????? ???"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("??? ????????? ???"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("??? ????????? ???")
                                ))
                ))
                .andReturn();
    }

    @Test
    @DisplayName("?????? ?????? ??????")
    void patchProduct() throws Exception {
        // given
        ProductPatchDto request = ProductPatchDto
                .builder()
                .productId(1L)
                .name("?????? ????????? ?????????")
                .price(50000)
                .photo("https://mblogthumb-phinf.pstatic.net/MjAxOTA4MDFfMjEy/MDAxNTY0NTkxNDM1NDUx.urpg1n3KGkxDWj1SzFUDfpLsktjOkApL1d80__uiU8Eg.5bA4E3R2G6Ix2rEtUcIBxlgB2I70yIgN4vN3pnVC01Qg.JPEG.pigre93/Ohys-Raws_Kimetsu_no_Yaiba_-_17_(BS11_1280x720_x264_AAC).mp4_20190801_011119.jpg?type=w800")
                .brand("?????? ????????? ?????????")
                .description("?????? ????????? ?????? ??????")
                .productStatus("FOR_SALE")
                .shippingCountry("FOREIGN_COUNTRY")
                .shippingMethod("INSTALLATION_SERVICE")
                .shippingPrice(50000)
                .build();

        given(productService.updateProduct(Mockito.any(ProductPatchDto.class))).willReturn(new Product());
        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "patchProduct",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("?????? ????????? (?????? ???????????? ????????? ?????? ???????????? ???????????? ?????????)"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                        fieldWithPath("photo").type(JsonFieldType.STRING).description("?????? ????????? ?????? URL"),
                                        fieldWithPath("brand").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("description").type(JsonFieldType.STRING).description("?????? ??????"),
                                        fieldWithPath("productStatus").type(JsonFieldType.STRING).description(
                                                "?????? ??????(????????????)\n" +
                                                        "ENUM ???????????? ????????? ?????? ?????? ???????????????.\n" +
                                                        "PREPARING_FOR_SALE(1, \"?????? ?????? ???\")\n" +
                                                        "FOR_SALE(2, \"?????? ???\")\n" +
                                                        "SUSPENSION_OF_SALE(3, \"?????? ??????\")"),
                                        fieldWithPath("shippingCountry").type(JsonFieldType.STRING).description(
                                                "??????/?????? ?????? ??????\n" +
                                                        "ENUM ???????????? ????????? ?????? ?????? ???????????????.\n" +
                                                        "KOREA(1, \"?????? ??????\"),\n" +
                                                        "FOREIGN_COUNTRY(2, \"?????? ??????\")"),
                                        fieldWithPath("shippingMethod").type(JsonFieldType.STRING).description(
                                                "?????? ??????\n" +
                                                        "ENUM ???????????? ????????? ?????? ?????? ???????????????.\n" +
                                                        "PARCEL_SERVICE(1, \"??????\"),\n" +
                                                        "INSTALLATION_SERVICE(2, \"???????????????\")"),
                                        fieldWithPath("shippingPrice").type(JsonFieldType.NUMBER).description("?????????")
                                )
                        ),
                        responseFields(fieldWithPath("data").description("?????? ?????????"))
                ))
                .andReturn();
    }

    @Test
    @DisplayName("?????? ??????")
    void deleteProduct() throws Exception {
        // given
        doNothing().when(productService).deleteProduct(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/products/{product-id}", 1L)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteProduct",
                        preprocessRequest(prettyPrint()),
                        pathParameters(parameterWithName("product-id").description("?????? ?????????"))
                ));
    }
}
