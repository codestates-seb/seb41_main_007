package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.ReviewMapper;
import com.bzzzzz.farm.model.dto.product.ProductSimpleResponseDto;
import com.bzzzzz.farm.model.dto.review.ReviewSimpleResponseDto;
import com.bzzzzz.farm.service.ProductService;
import com.bzzzzz.farm.service.ReviewService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureRestDocs
@WebMvcTest(MainController.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(roles = "USER")
public class MainControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ProductService productService;
    @MockBean
    private ReviewService reviewService;
    @MockBean
    private ReviewMapper reviewMapper;

    @Test
    @DisplayName("메인 페이지 가져오기")
    void getMain() throws Exception {
        // given
        List<ProductSimpleResponseDto> products = new ArrayList<>();
        for (long i = 5; i >= 1; i--) {
            products.add(new ProductSimpleResponseDto(
                    i,
                    "테스트" + i,
                    5000,
                    "http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg",
                    "판매 준비 중"));
        }

        List<ReviewSimpleResponseDto> reviews = new ArrayList<>();
        for (long i = 4; i >= 1; i--) {
            reviews.add(
                    ReviewSimpleResponseDto
                            .builder()
                            .reviewId(i)
                            .reviewTitle("리뷰 제목" + i)
                            .reviewContent("리뷰 내용" + i)
                            .rating(5.0f)
                            .createdAt(LocalDateTime.now())
                            .modifiedAt(LocalDateTime.now())
                            .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                            .memberName("사용자" + i)
                            .build()
            );
        }

        given(productService.findProducts(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyString(), Mockito.anyString(), Mockito.isNull(), Mockito.isNull())).willReturn(new PageImpl<>(products));
        given(reviewService.findReviewsOrderByReviewId()).willReturn(List.of());
        given(reviewMapper.reviewsToReviewSimpleResponseDtos(Mockito.anyList())).willReturn(reviews);

        // when
        ResultActions actions = mockMvc.perform(
                get("/")
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderByLikeCount").isArray())
                .andExpect(jsonPath("$.orderByProductId").isArray())
                .andExpect(jsonPath("$.orderBySoldCount").isArray())
                .andExpect(jsonPath("$.reviews").isArray())
                .andDo(document(
                        "getMain",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                List.of(
                                        fieldWithPath("orderByLikeCount").type(JsonFieldType.ARRAY).description("좋아요 높은 순 정렬 (최대 10개)"),
                                        fieldWithPath("orderByLikeCount[*].productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                        fieldWithPath("orderByLikeCount[*].name").type(JsonFieldType.STRING).description("제품명"),
                                        fieldWithPath("orderByLikeCount[*].price").type(JsonFieldType.NUMBER).description("제품 가격"),
                                        fieldWithPath("orderByLikeCount[*].photo").type(JsonFieldType.STRING).description("제품 썸네일 사진"),
                                        fieldWithPath("orderByLikeCount[*].productStatus").type(JsonFieldType.STRING).description("제품 상태"),
                                        fieldWithPath("orderByProductId").type(JsonFieldType.ARRAY).description("신상품 순 정렬 (최대 7개)"),
                                        fieldWithPath("orderByProductId[*].productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                        fieldWithPath("orderByProductId[*].name").type(JsonFieldType.STRING).description("제품명"),
                                        fieldWithPath("orderByProductId[*].price").type(JsonFieldType.NUMBER).description("제품 가격"),
                                        fieldWithPath("orderByProductId[*].photo").type(JsonFieldType.STRING).description("제품 썸네일 사진"),
                                        fieldWithPath("orderByProductId[*].productStatus").type(JsonFieldType.STRING).description("제품 상태"),
                                        fieldWithPath("orderBySoldCount").type(JsonFieldType.ARRAY).description("판매량 순 정렬 (최대 20개)"),
                                        fieldWithPath("orderBySoldCount[*].productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                        fieldWithPath("orderBySoldCount[*].name").type(JsonFieldType.STRING).description("제품명"),
                                        fieldWithPath("orderBySoldCount[*].price").type(JsonFieldType.NUMBER).description("제품 가격"),
                                        fieldWithPath("orderBySoldCount[*].photo").type(JsonFieldType.STRING).description("제품 썸네일 사진"),
                                        fieldWithPath("orderBySoldCount[*].productStatus").type(JsonFieldType.STRING).description("제품 상태"),
                                        fieldWithPath("reviews").type(JsonFieldType.ARRAY).description("최근 리뷰 (최대 4개)"),
                                        fieldWithPath("reviews[*].reviewId").type(JsonFieldType.NUMBER).description("리뷰 식별자"),
                                        fieldWithPath("reviews[*].reviewTitle").type(JsonFieldType.STRING).description("리뷰 제목"),
                                        fieldWithPath("reviews[*].reviewContent").type(JsonFieldType.STRING).description("리뷰 내용"),
                                        fieldWithPath("reviews[*].rating").type(JsonFieldType.NUMBER).description("별점"),
                                        fieldWithPath("reviews[*].createdAt").type(JsonFieldType.STRING).description("생성일자"),
                                        fieldWithPath("reviews[*].modifiedAt").type(JsonFieldType.STRING).description("수정일자"),
                                        fieldWithPath("reviews[*].memberName").type(JsonFieldType.STRING).description("작성자 이름"),
                                        fieldWithPath("reviews[*].photo").type(JsonFieldType.STRING).description("제품 사진")
                                )
                        )
                ));

    }
}
