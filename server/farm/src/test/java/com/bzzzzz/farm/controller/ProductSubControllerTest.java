package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.ProductMapper;
import com.bzzzzz.farm.model.dto.IdRequestDto;
import com.bzzzzz.farm.model.dto.product.*;
import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductCategory;
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
    @MockBean
    private ProductMapper productMapper;

    @Test
    @DisplayName("카테고리에 제품을 추가")
    void postProductCategory() throws Exception {
        // given
        ProductCategoryPostDto request = new ProductCategoryPostDto(1L, 1L);

        ProductCategoryResponseDto response = ProductCategoryResponseDto
                .builder()
                .productCategoryId(1L)
                .categoryId(1L)
                .name("테스트 카테고리명")
                .build();

        given(productService.findVerifiedProduct(Mockito.anyLong())).willReturn(new Product());
        given(categoryService.findVerifiedCategory(Mockito.anyLong())).willReturn(new Category());
        given(productMapper.productCategoryPostDtoToProductCategory(Mockito.any(ProductCategoryPostDto.class))).willReturn(new ProductCategory());
        given(productCategoryService.createProductCategory(Mockito.any(ProductCategory.class))).willReturn(new ProductCategory());
        given(productMapper.productCategoryToProductCategoryResponseDto(Mockito.any(ProductCategory.class))).willReturn(response);

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
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                        fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("카테고리 식별자")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("productCategoryId").type(JsonFieldType.NUMBER).description("제품카테고리 식별자"),
                                        fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("카테고리 식별자"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("카테고리명")
                                )
                        )
                ));

    }

    @Test
    @DisplayName("제품이 속한 카테고리 위치를 수정")
    void patchProductCategory() throws Exception {
        // given
        ProductCategoryPatchDto request = new ProductCategoryPatchDto(1L, 2L);
        ProductCategoryResponseDto response = ProductCategoryResponseDto
                .builder()
                .productCategoryId(request.getProductCategoryId())
                .categoryId(request.getCategoryId())
                .build();

        given(categoryService.findVerifiedCategory(Mockito.anyLong())).willReturn(new Category());
        given(productCategoryService.updateProductCategory(Mockito.any(ProductCategoryPatchDto.class))).willReturn(new ProductCategory());
        given(productMapper.productCategoryToProductCategoryResponseDto(Mockito.any(ProductCategory.class))).willReturn(response);

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
                                        fieldWithPath("productCategoryId").type(JsonFieldType.NUMBER).description("수정할 대상의 식별자"),
                                        fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("카테고리 식별자")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("productCategoryId").type(JsonFieldType.NUMBER).description("수정할 대상의 식별자"),
                                        fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("카테고리 식별자"),
                                        fieldWithPath("name").type(JsonFieldType.NULL).description("카테고리명 (null이 들어오면 정상입니다)")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("카테고리에서 제품을 제외")
    void deleteProductCategory() throws Exception {
        // given
        IdRequestDto request = new IdRequestDto();
        request.setId(1L);

        doNothing().when(productCategoryService).deleteProductCategory(Mockito.anyLong());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/products/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteProductCategory",
                        preprocessRequest(prettyPrint()),
                        requestFields(fieldWithPath("id").type(JsonFieldType.NUMBER).description("삭제할 대상의 식별자"))

                ))
                .andReturn();
    }

    @Test
    @DisplayName("제품에 옵션을 추가")
    void postProductOption() throws Exception {
        // given
        ProductOptionPostDto request = new ProductOptionPostDto("추가할 옵션명", 5000, 100, 1L);

        given(productService.findVerifiedProduct(Mockito.anyLong())).willReturn(new Product());
        given(productMapper.productOptionPostDtoToProductOption(Mockito.any(ProductOptionPostDto.class))).willReturn(new ProductOption());
        doNothing().when(productOptionService).createProductOption(Mockito.any(ProductOption.class));

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
                                        fieldWithPath("productOptionName").type(JsonFieldType.STRING).description("추가할 옵션명"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("옵션 가격"),
                                        fieldWithPath("stock").type(JsonFieldType.NUMBER).description("옵션 재고"),
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("옵션을 추가할 대상 제품 식별자")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("옵션 수정")
    void patchProductOption() throws Exception {
        // given
        ProductOptionPatchDto request = new ProductOptionPatchDto(1L, "수정할 옵션명", 10000, 200);

        doNothing().when(productOptionService).updateProductOption(Mockito.any(ProductOptionPatchDto.class));

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
                                        fieldWithPath("productOptionId").type(JsonFieldType.NUMBER).description("옵션 식별자"),
                                        fieldWithPath("productOptionName").type(JsonFieldType.STRING).description("옵션명"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("옵션 가격"),
                                        fieldWithPath("stock").type(JsonFieldType.NUMBER).description("옵션 재고")
                                )
                        )
                ));

    }
}
