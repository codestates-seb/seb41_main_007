package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.category.CategoryPatchDto;
import com.bzzzzz.farm.model.dto.category.CategoryPostDto;
import com.bzzzzz.farm.model.dto.category.CategoryResponseDto;
import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.service.CategoryService;
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
@WebMvcTest(CategoryController.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(roles = {"USER", "ADMIN"})
public class CategoryControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private CategoryService categoryService;

    @Test
    @DisplayName("???????????? ??????")
    void postCategory() throws Exception {
        // given
        CategoryPostDto request = new CategoryPostDto("????????? ????????????");

        given(categoryService.createCategory(Mockito.any(CategoryPostDto.class))).willReturn(new Category());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                post("/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "postCategory",
                        preprocessRequest(prettyPrint()),
                        requestFields(fieldWithPath("name").type(JsonFieldType.STRING).description("???????????????"))
                ));
    }

    @Test
    @DisplayName("???????????? ??????")
    void patchCategory() throws Exception {
        // given
        CategoryPatchDto request = new CategoryPatchDto(1L, 3, "???????????????");

        given(categoryService.updateCategory(Mockito.any(CategoryPatchDto.class))).willReturn(new Category());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "patchCategory",
                        preprocessRequest(prettyPrint()),
                        requestFields(List.of(
                                fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("???????????? ??????"),
                                fieldWithPath("sequenceNum").type(JsonFieldType.NUMBER).description("???????????? ????????? ?????? ???"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("???????????????")
                        ))
                ));
    }

    @Test
    @DisplayName("???????????? ?????? ????????????")
    void getCategories() throws Exception {
        // given
        CategoryResponseDto categoryResponseDto1 = CategoryResponseDto
                .builder()
                .categoryId(1L)
                .name("????????? ????????????1")
                .sequenceNum(1)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();
        CategoryResponseDto categoryResponseDto2 = CategoryResponseDto
                .builder()
                .categoryId(2L)
                .name("????????? ????????????2")
                .sequenceNum(2)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();
        CategoryResponseDto categoryResponseDto3 = CategoryResponseDto
                .builder()
                .categoryId(3L)
                .name("????????? ????????????3")
                .sequenceNum(3)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();

        List<CategoryResponseDto> response = List.of(categoryResponseDto1, categoryResponseDto2, categoryResponseDto3);

        given(categoryService.findCategories()).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/categories")
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].categoryId").value(categoryResponseDto1.getCategoryId()))
                .andExpect(jsonPath("$.[0].name").value(categoryResponseDto1.getName()))
                .andExpect(jsonPath("$.[0].sequenceNum").value(categoryResponseDto1.getSequenceNum()))
                .andExpect(jsonPath("$.[0].createdAt").isString())
                .andExpect(jsonPath("$.[0].modifiedAt").isString())
                .andExpect(jsonPath("$.[1].categoryId").value(categoryResponseDto2.getCategoryId()))
                .andExpect(jsonPath("$.[1].name").value(categoryResponseDto2.getName()))
                .andExpect(jsonPath("$.[1].sequenceNum").value(categoryResponseDto2.getSequenceNum()))
                .andExpect(jsonPath("$.[1].createdAt").isString())
                .andExpect(jsonPath("$.[1].modifiedAt").isString())
                .andExpect(jsonPath("$.[2].categoryId").value(categoryResponseDto3.getCategoryId()))
                .andExpect(jsonPath("$.[2].name").value(categoryResponseDto3.getName()))
                .andExpect(jsonPath("$.[2].sequenceNum").value(categoryResponseDto3.getSequenceNum()))
                .andExpect(jsonPath("$.[2].createdAt").isString())
                .andExpect(jsonPath("$.[2].modifiedAt").isString())
                .andDo(document(
                        "getCategories",
                        preprocessResponse(prettyPrint()),
                        responseFields(List.of(
                                fieldWithPath("[*].categoryId").type(JsonFieldType.NUMBER).description("???????????? ?????????"),
                                fieldWithPath("[*].name").type(JsonFieldType.STRING).description("???????????? ?????????"),
                                fieldWithPath("[*].sequenceNum").type(JsonFieldType.NUMBER).description("???????????? ????????? ?????? ???(?????? ?????? ???????????? ???????????????)"),
                                fieldWithPath("[*].createdAt").type(JsonFieldType.STRING).description("???????????? ????????????"),
                                fieldWithPath("[*].modifiedAt").type(JsonFieldType.STRING).description("???????????? ????????????")
                        ))
                ));

    }

    @Test
    @DisplayName("???????????? ??????")
    void deleteCategory() throws Exception {
        // given
        doNothing().when(categoryService).deleteCategory(Mockito.anyLong());

        // when
        ResultActions actions = mockMvc.perform(
                delete("/categories/{category-id}",1L)
                        .with(csrf())
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteCategory",
                        preprocessRequest(prettyPrint()),
                        pathParameters(parameterWithName("category-id").description("???????????? ?????????"))
                ));
    }
}
