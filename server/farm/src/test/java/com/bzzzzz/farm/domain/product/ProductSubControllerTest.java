package com.bzzzzz.farm.domain.product;

import com.bzzzzz.farm.domain.category.entity.Category;
import com.bzzzzz.farm.domain.category.service.CategoryService;
import com.bzzzzz.farm.domain.product.controller.ProductController;
import com.bzzzzz.farm.domain.product.controller.ProductSubController;
import com.bzzzzz.farm.domain.product.dto.ProductCategoryPatchDto;
import com.bzzzzz.farm.domain.product.dto.ProductCategoryPostDto;
import com.bzzzzz.farm.domain.product.dto.ProductCategoryResponseDto;
import com.bzzzzz.farm.domain.product.entity.Product;
import com.bzzzzz.farm.domain.product.entity.ProductCategory;
import com.bzzzzz.farm.domain.product.mapper.ProductMapper;
import com.bzzzzz.farm.domain.product.service.ProductCategoryService;
import com.bzzzzz.farm.domain.product.service.ProductOptionService;
import com.bzzzzz.farm.domain.product.service.ProductService;
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
        ProductCategoryPostDto post = new ProductCategoryPostDto(1L, 1L);

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

        String content = gson.toJson(post);

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
                .andExpect(jsonPath("$.categoryId").value(post.getCategoryId()))
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
        ProductCategoryPatchDto patch = new ProductCategoryPatchDto(1L, 2L);


    }
}
