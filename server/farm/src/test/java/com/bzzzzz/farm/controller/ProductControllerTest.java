package com.bzzzzz.farm.controller;

import com.bzzzzz.farm.mapper.ProductMapper;
import com.bzzzzz.farm.model.dto.IdRequestDto;
import com.bzzzzz.farm.model.dto.product.*;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductCategory;
import com.bzzzzz.farm.model.entity.ProductOption;
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
    private ProductMapper productMapper;
    @MockBean
    private ProductCategoryService productCategoryService;
    @MockBean
    private ProductOptionService productOptionService;

    @Test
    @DisplayName("제품 등록")
    void postProduct() throws Exception {
        // given
        Product product = new Product();
        product.setProductId(1L);
        ProductPostDto request = ProductPostDto
                .builder()
                .name("테스트제품")
                .price(30000)
                .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                .brand("테스트브랜드")
                .body("상세 설명이 들어갑니다")
                .description("간략한 설명이 들어갑니다")
                .shippingCountry("KOREA")
                .shippingMethod("PARCEL_SERVICE")
                .shippingPrice(3000)
                .productCategoryPostDtos(List.of(new ProductCategoryPostDto(1L)))
                .productOptionPostDtos(List.of(new ProductOptionPostDto("옵션이름", 5000, 100)))
                .build();

        given(productMapper.productPostDtoToProduct(Mockito.any(ProductPostDto.class))).willReturn(new Product());
        given(productService.createProduct(Mockito.any(Product.class))).willReturn(product);
        given(productCategoryService.createProductCategory(Mockito.any(ProductCategory.class))).willReturn(new ProductCategory());
        doNothing().when(productOptionService).createProductOption(Mockito.any(ProductOption.class));

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
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("제품명"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("제품 가격"),
                                        fieldWithPath("photo").type(JsonFieldType.STRING).description("제품 썸네일 사진 URL"),
                                        fieldWithPath("brand").type(JsonFieldType.STRING).description("제조사"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("제품 상세 설명"),
                                        fieldWithPath("description").type(JsonFieldType.STRING).description("제품 간단 설명"),
                                        fieldWithPath("shippingCountry").type(JsonFieldType.STRING).description(
                                                "국내/해외 배송 여부\n" +
                                                        "ENUM 타입으로 지정된 값만 입력 가능합니다.\n" +
                                                        "KOREA(1, \"국내 배송\"),\n" +
                                                        "FOREIGN_COUNTRY(2, \"해외 배송\")"),
                                        fieldWithPath("shippingMethod").type(JsonFieldType.STRING).description(
                                                "배송 방법" +
                                                        "ENUM 타입으로 지정된 값만 입력 가능합니다.\n" +
                                                        "PARCEL_SERVICE(1, \"택배\"),\n" +
                                                        "INSTALLATION_SERVICE(2, \"설치서비스\")"),
                                        fieldWithPath("shippingPrice").type(JsonFieldType.NUMBER).description("배송비"),
                                        fieldWithPath("productCategoryPostDtos").type(JsonFieldType.ARRAY).description("제품이 포함될 카테고리 (1개 이상 필수)"),
                                        fieldWithPath("productCategoryPostDtos[*].categoryId").type(JsonFieldType.NUMBER).description("카테고리 식별자"),
                                        fieldWithPath("productOptionPostDtos").type(JsonFieldType.ARRAY).description("제품 옵션 목록 (1개 이상 필수)"),
                                        fieldWithPath("productOptionPostDtos[*].productOptionName").type(JsonFieldType.STRING).description("옵션명"),
                                        fieldWithPath("productOptionPostDtos[*].price").type(JsonFieldType.NUMBER).description("옵션 가격"),
                                        fieldWithPath("productOptionPostDtos[*].stock").type(JsonFieldType.NUMBER).description("옵션 재고")
                                )
                        ),
                        responseFields(fieldWithPath("data").description("생성된 제품 식별자"))
                ))
                .andReturn();
    }

    @Test
    @DisplayName("제품 상세정보 조회")
    void getProduct() throws Exception {
        // given
        long productId = 1L;

        ProductDetailResponseDto response = ProductDetailResponseDto
                .builder()
                .productId(productId)
                .name("테스트제품")
                .price(10000)
                .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                .shippingCountry("국내 배송")
                .shippingMethod("택배")
                .shippingPrice(3000)
                .body("제품에 대한 상세 설명입니다.")
                .description("제품에 대한 간단한 설명입니다.")
                .brand("테스트브랜드")
                .productStatus("판매 중")
                .viewCount(200)
                .likeCount(30)
                .soldCount(10)
                .isLiked(false)
                .productCategoryResponseDtos(
                        List.of(
                                ProductCategoryResponseDto
                                        .builder()
                                        .productCategoryId(1L)
                                        .categoryId(1L)
                                        .name("테스트카테고리")
                                        .build()))
                .productOptionResponseDtos(
                        List.of(
                                ProductOptionResponseDto
                                        .builder()
                                        .productOptionId(1L)
                                        .productOptionName("테스트 옵션")
                                        .price(5000)
                                        .stock(100)
                                        .build()))
                .build();

        given(productService.findProduct(Mockito.anyLong())).willReturn(new Product());
        given(productMapper.productToProductDetailResponseDto(Mockito.any(Product.class), Mockito.anyBoolean())).willReturn(response);

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
                        pathParameters(parameterWithName("product-id").description("제품 식별자")),
                        responseFields(List.of(
                                fieldWithPath("productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("제품명"),
                                fieldWithPath("price").type(JsonFieldType.NUMBER).description("제품 가격"),
                                fieldWithPath("photo").type(JsonFieldType.STRING).description("제품 썸네일 사진 URL"),
                                fieldWithPath("shippingCountry").type(JsonFieldType.STRING).description("국내/해외 배송 여부"),
                                fieldWithPath("shippingMethod").type(JsonFieldType.STRING).description("배송 방법"),
                                fieldWithPath("shippingPrice").type(JsonFieldType.NUMBER).description("배송비"),
                                fieldWithPath("body").type(JsonFieldType.STRING).description("제품 상세 설명"),
                                fieldWithPath("description").type(JsonFieldType.STRING).description("제품 간단 설명"),
                                fieldWithPath("brand").type(JsonFieldType.STRING).description("제조사"),
                                fieldWithPath("productStatus").type(JsonFieldType.STRING).description("제품 상태"),
                                fieldWithPath("viewCount").type(JsonFieldType.NUMBER).description("조회수"),
                                fieldWithPath("likeCount").type(JsonFieldType.NUMBER).description("추천수"),
                                fieldWithPath("soldCount").type(JsonFieldType.NUMBER).description("판매량"),
                                fieldWithPath("isLiked").type(JsonFieldType.BOOLEAN).description("추천 눌렀는지 여부(로그인 했을 경우)"),
                                fieldWithPath("productOptionResponseDtos").type(JsonFieldType.ARRAY).description("제품 옵션 목록"),
                                fieldWithPath("productOptionResponseDtos[*].productOptionId").type(JsonFieldType.NUMBER).description("옵션 식별자"),
                                fieldWithPath("productOptionResponseDtos[*].productOptionName").type(JsonFieldType.STRING).description("옵션명"),
                                fieldWithPath("productOptionResponseDtos[*].price").type(JsonFieldType.NUMBER).description("옵션 가격"),
                                fieldWithPath("productOptionResponseDtos[*].stock").type(JsonFieldType.NUMBER).description("옵션 재고"),
                                fieldWithPath("productCategoryResponseDtos").type(JsonFieldType.ARRAY).description("카테고리 목록(제품이 포함된)"),
                                fieldWithPath("productCategoryResponseDtos[*].productCategoryId").type(JsonFieldType.NUMBER).description("제품 카테고리 식별자"),
                                fieldWithPath("productCategoryResponseDtos[*].categoryId").type(JsonFieldType.NUMBER).description("카테고리 식별자(실제 카테고리)"),
                                fieldWithPath("productCategoryResponseDtos[*].name").type(JsonFieldType.STRING).description("카테고리명(실제 카테고리)")
                        ))
                ))
                .andReturn();
    }

    @Test
    @DisplayName("제품 전체목록 조회(검색)")
    void getProducts() throws Exception {
        // given
        List<ProductSimpleResponseDto> response = new ArrayList<>();
        for (long i = 40; i >= 1; i--) {
            response.add(new ProductSimpleResponseDto(
                    i,
                    "테스트 제품" + i,
                    30000,
                    "http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg",
                    "판매 중"));
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
                                parameterWithName("page").description("요청할 페이지 (기본값 = 1) * 이하 미입력시 기본값 혹은 값을 주지 않습니다 *"),
                                parameterWithName("size").description("한 페이지당 표시할 게시물 수 (기본값 = 40)"),
                                parameterWithName("categoryId").description("특정 카테고리에 속한 제품들을 보고 싶은 경우 카테고리의 식별자를 입력"),
                                parameterWithName("sort").description("정렬 기준 = productId(최신순, 기본값), name(상품이름순), price(가격순), brand(제조사순), likeCount(인기순), soldCount(판매량순)"),
                                parameterWithName("order").description("정렬 방법 = descending(내림차순, 기본값), ascending(오름차순)"),
                                parameterWithName("keyword").description("검색어 = 제품명, 본문, 브랜드안에서 검색")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[*].productId").type(JsonFieldType.NUMBER).description("제품 식별자"),
                                        fieldWithPath("data[*].name").type(JsonFieldType.STRING).description("제품 명"),
                                        fieldWithPath("data[*].price").type(JsonFieldType.NUMBER).description("제품 가격"),
                                        fieldWithPath("data[*].photo").type(JsonFieldType.STRING).description("제품 썸네일 사진 URL"),
                                        fieldWithPath("data[*].productStatus").type(JsonFieldType.STRING).description("제품 상태"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("한 페이지당 표시할 데이터 수"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                                ))
                ))
                .andReturn();
    }

    @Test
    @DisplayName("제품 정보 수정")
    void patchProduct() throws Exception {
        // given
        ProductPatchDto request = ProductPatchDto
                .builder()
                .productId(1L)
                .name("패치 테스트 제품명")
                .price(50000)
                .photo("https://mblogthumb-phinf.pstatic.net/MjAxOTA4MDFfMjEy/MDAxNTY0NTkxNDM1NDUx.urpg1n3KGkxDWj1SzFUDfpLsktjOkApL1d80__uiU8Eg.5bA4E3R2G6Ix2rEtUcIBxlgB2I70yIgN4vN3pnVC01Qg.JPEG.pigre93/Ohys-Raws_Kimetsu_no_Yaiba_-_17_(BS11_1280x720_x264_AAC).mp4_20190801_011119.jpg?type=w800")
                .brand("패치 테스트 브랜드")
                .description("패치 테스트 제품 설명")
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
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("제품 식별자 (제품 식별자를 제외한 모든 데이터는 선택사항 입니다)"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("제품명"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("제품 가격"),
                                        fieldWithPath("photo").type(JsonFieldType.STRING).description("제품 썸네일 사진 URL"),
                                        fieldWithPath("brand").type(JsonFieldType.STRING).description("제조사"),
                                        fieldWithPath("description").type(JsonFieldType.STRING).description("제품 설명"),
                                        fieldWithPath("productStatus").type(JsonFieldType.STRING).description(
                                                "제품 상태(판매여부)\n" +
                                                        "ENUM 타입으로 지정된 값만 입력 가능합니다.\n" +
                                                        "PREPARING_FOR_SALE(1, \"판매 준비 중\")\n" +
                                                        "FOR_SALE(2, \"판매 중\")\n" +
                                                        "SUSPENSION_OF_SALE(3, \"판매 중지\")"),
                                        fieldWithPath("shippingCountry").type(JsonFieldType.STRING).description(
                                                "국내/해외 배송 여부\n" +
                                                        "ENUM 타입으로 지정된 값만 입력 가능합니다.\n" +
                                                        "KOREA(1, \"국내 배송\"),\n" +
                                                        "FOREIGN_COUNTRY(2, \"해외 배송\")"),
                                        fieldWithPath("shippingMethod").type(JsonFieldType.STRING).description(
                                                "배송 방법\n" +
                                                        "ENUM 타입으로 지정된 값만 입력 가능합니다.\n" +
                                                        "PARCEL_SERVICE(1, \"택배\"),\n" +
                                                        "INSTALLATION_SERVICE(2, \"설치서비스\")"),
                                        fieldWithPath("shippingPrice").type(JsonFieldType.NUMBER).description("배송비")
                                )
                        ),
                        responseFields(fieldWithPath("data").description("제품 식별자"))
                ))
                .andReturn();
    }

    @Test
    @DisplayName("제품 삭제")
    void deleteProduct() throws Exception {
        // given
        IdRequestDto request = new IdRequestDto();
        request.setId(1L);

        doNothing().when(productService).deleteProduct(request.getId());
        String content = gson.toJson(request);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "deleteProduct",
                        preprocessRequest(prettyPrint()),
                        requestFields(fieldWithPath("id").type(JsonFieldType.NUMBER).description("삭제할 제품 식별자"))
                ));
    }
}
