package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.model.dto.like.LikeRequestDto;
import com.bzzzzz.farm.service.LikeService;
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

import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@WebMvcTest(LikeController.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(roles = "USER")
public class LikeControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private LikeService likeService;

    @Test
    @DisplayName("제품 추천하기(좋아요)")
    void postLike() throws Exception {
        // given
        LikeRequestDto request = new LikeRequestDto(1L, 1L);

        doNothing().when(likeService).createLike(Mockito.anyLong(), Mockito.anyLong());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                post("/likes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andDo(document(
                        "postLike",
                        preprocessRequest(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자 (없어질수도 있어요!)"),
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("제품 식별자")
                                )
                        )
                ));
    }

    @Test
    @DisplayName("추천 취소하기(좋아요취소)")
    void deleteLike() throws Exception {
        // given
        LikeRequestDto request = new LikeRequestDto(1L, 1L);

        doNothing().when(likeService).deleteLike(Mockito.anyLong(), Mockito.anyLong());

        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/likes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteLike",
                        preprocessRequest(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자 (없어질수도 있어요!)"),
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("제품 식별자")
                                )
                        )
                ));
    }
}
