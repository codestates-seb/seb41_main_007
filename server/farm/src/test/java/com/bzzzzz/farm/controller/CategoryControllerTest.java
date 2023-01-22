package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.CategoryMapper;
import com.bzzzzz.farm.model.dto.IdRequestDto;
import com.bzzzzz.farm.model.dto.category.CategoryPatchDto;
import com.bzzzzz.farm.model.dto.category.CategoryPostDto;
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
    @MockBean
    private CategoryMapper categoryMapper;

    @Test
    @DisplayName("카테고리 등록")
    void postCategory() throws Exception {
        // given
        CategoryPostDto request = new CategoryPostDto("테스트 카테고리");

        given(categoryMapper.categoryPostDtoToCategory(Mockito.any(CategoryPostDto.class))).willReturn(new Category());
        given(categoryService.createCategory(Mockito.any(Category.class))).willReturn(new Category());

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
                        requestFields(fieldWithPath("name").type(JsonFieldType.STRING).description("카테고리명"))
                ));
    }

    @Test
    @DisplayName("카테고리 수정")
    void patchCategory() throws Exception {
        // given
        CategoryPatchDto request = new CategoryPatchDto(1L, 3, "카테고리명");

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
                                fieldWithPath("categoryId").type(JsonFieldType.NUMBER).description("카테고리 식별"),
                                fieldWithPath("sequenceNum").type(JsonFieldType.NUMBER).description("카테고리 정렬을 위한 값"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("카테고리명")
                        ))
                ));
    }

    @Test
    @DisplayName("카테고리 목록 가져오기")
    void getCategories() throws Exception {
        // given

        // when

        // then

    }

    @Test
    @DisplayName("카테고리 삭제")
    void deleteCategory() throws Exception {
        // given
        IdRequestDto request = new IdRequestDto();
        request.setId(1L);

        doNothing().when(categoryService).deleteCategory(Mockito.anyLong());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteCategory",
                        preprocessRequest(prettyPrint()),
                        requestFields(fieldWithPath("id").type(JsonFieldType.NUMBER).description("삭제할 카테고리 식별자"))
                ));
    }
}
