package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.product.*;
import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.service.CategoryService;
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
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

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
@WebMvcTest(ProductSubController.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(roles = "ADMIN")
public class ProductSubControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private ProductService productService;
    @MockBean
    private ProductCategoryService productCategoryService;
    @MockBean
    private ProductOptionService productOptionService;
    @MockBean
    private CategoryService categoryService;

    @Test
    @DisplayName("??????????????? ????????? ??????")
    void postProductCategory() throws Exception {
        // given
        ProductCategoryPostDto request = new ProductCategoryPostDto(1L, 1L);

        ProductCategoryResponseDto response = ProductCategoryResponseDto
                .builder()
                .productCategoryId(1L)
                .categoryId(1L)
                .name("????????? ???????????????")
                .build();

        given(productService.findVerifiedProduct(Mockito.anyLong())).willReturn(new Product());
        given(categoryService.findVerifiedCategory(Mockito.anyLong())).willReturn(new Category());
        given(productCategoryService.createProductCategory(Mockito.any(ProductCategoryPostDto.class))).willReturn(response);

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                post("/products/categories")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.productCategoryId").value(response.getProductCategoryId()))
                .andExpect(jsonPath("$.categoryId").value(request.getCategoryId()))
                .andExpect(jsonPath("$.name").value(response.getName()))
                .andDo(document(
                        "postProductCategory",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("???????????? ?????????")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("productCategoryId").type(JsonFieldType.NUMBER).description("?????????????????? ?????????"),
                                        fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("???????????????")
                                )
                        )
                ));

    }

    @Test
    @DisplayName("????????? ?????? ???????????? ????????? ??????")
    void patchProductCategory() throws Exception {
        // given
        ProductCategoryPatchDto request = new ProductCategoryPatchDto(1L, 2L);
        ProductCategoryResponseDto response = ProductCategoryResponseDto
                .builder()
                .productCategoryId(request.getProductCategoryId())
                .categoryId(request.getCategoryId())
                .build();

        given(categoryService.findVerifiedCategory(Mockito.anyLong())).willReturn(new Category());
        given(productCategoryService.updateProductCategory(Mockito.any(ProductCategoryPatchDto.class))).willReturn(response);

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/products/categories")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productCategoryId").value(request.getProductCategoryId()))
                .andExpect(jsonPath("$.categoryId").value(request.getCategoryId()))
                .andExpect(jsonPath("$.name").value(response.getName()))
                .andDo(document(
                        "patchProductCategory",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("productCategoryId").type(JsonFieldType.NUMBER).description("????????? ????????? ?????????"),
                                        fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("???????????? ?????????")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("productCategoryId").type(JsonFieldType.NUMBER).description("????????? ????????? ?????????"),
                                        fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
                                        fieldWithPath("name").type(JsonFieldType.NULL).description("??????????????? (null??? ???????????? ???????????????)")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("?????????????????? ????????? ??????")
    void deleteProductCategory() throws Exception {
        // given
        doNothing().when(productCategoryService).deleteProductCategory(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/products/categories/{product-category-id}", 1L)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteProductCategory",
                        preprocessRequest(prettyPrint()),
                        pathParameters(parameterWithName("product-category-id").description("????????? ????????? ?????????"))

                ))
                .andReturn();
    }

    @Test
    @DisplayName("????????? ????????? ??????")
    void postProductOption() throws Exception {
        // given
        ProductOptionPostDto request = new ProductOptionPostDto("????????? ?????????", 5000, 100, 1L);

        given(productService.findVerifiedProduct(Mockito.anyLong())).willReturn(new Product());
        doNothing().when(productOptionService).createProductOption(Mockito.any(ProductOptionPostDto.class));

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                post("/products/options")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "postProductOption",
                        preprocessRequest(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("productOptionName").type(JsonFieldType.STRING).description("????????? ?????????"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                        fieldWithPath("stock").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("????????? ????????? ?????? ?????? ?????????")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("?????? ??????")
    void patchProductOption() throws Exception {
        // given
        ProductOptionPatchDto request = new ProductOptionPatchDto(1L, "????????? ?????????", 10000, 200);

        given(productOptionService.updateProductOption(Mockito.any(ProductOptionPatchDto.class))).willReturn(new ProductOption());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/products/options")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "patchProductOption",
                        preprocessRequest(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("productOptionId").type(JsonFieldType.NUMBER).description("?????? ?????????"),
                                        fieldWithPath("productOptionName").type(JsonFieldType.STRING).description("?????????"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("?????? ??????"),
                                        fieldWithPath("stock").type(JsonFieldType.NUMBER).description("?????? ??????")
                                )
                        )
                ));

    }

    @Test
    @DisplayName("?????? ??????")
    void deleteProductOption() throws Exception {
        // given
        doNothing().when(productOptionService).deleteProductOption(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/products/options/{product-option-id}", 1L)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteProductOption",
                        preprocessRequest(prettyPrint()),
                        pathParameters(parameterWithName("product-option-id").description("????????? ????????? ?????????"))

                ))
                .andReturn();
    }
}
