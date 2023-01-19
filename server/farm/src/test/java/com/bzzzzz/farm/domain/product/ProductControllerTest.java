package com.bzzzzz.farm.domain.product;

import com.bzzzzz.farm.domain.like.service.LikeService;
import com.bzzzzz.farm.domain.product.controller.ProductController;
import com.bzzzzz.farm.domain.product.dto.*;
import com.bzzzzz.farm.domain.product.entity.Product;
import com.bzzzzz.farm.domain.product.entity.ProductCategory;
import com.bzzzzz.farm.domain.product.entity.ProductOption;
import com.bzzzzz.farm.domain.product.mapper.ProductMapper;
import com.bzzzzz.farm.domain.product.service.ProductCategoryService;
import com.bzzzzz.farm.domain.product.service.ProductOptionService;
import com.bzzzzz.farm.domain.product.service.ProductService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.parameters.P;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    void postProduct() throws Exception {
        // given
        Product product = new Product();
        product.setProductId(1L);
        ProductPostDto post = ProductPostDto
                .builder()
                .name("테스트제품")
                .price(30000)
                .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                .brand("테스트브랜드")
                .description("테스트 제품 설명")
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

        String content = gson.toJson(post);

        // when
        ResultActions actions = mockMvc.perform(
                post("/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        MvcResult result = actions
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
                                        fieldWithPath("description").type(JsonFieldType.STRING).description("제품 설명"),
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

        System.out.println("\nresult = " + result.getResponse().getContentAsString() + "\n");
    }

    @Test
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
                .description("테스트 제품에 대한 설명입니다.")
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
        MvcResult result = actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(response.getProductId()))
                .andExpect(jsonPath("$.name").value(response.getName()))
                .andExpect(jsonPath("$.price").value(response.getPrice()))
                .andExpect(jsonPath("$.photo").value(response.getPhoto()))
                .andExpect(jsonPath("$.shippingCountry").value(response.getShippingCountry()))
                .andExpect(jsonPath("$.shippingMethod").value(response.getShippingMethod()))
                .andExpect(jsonPath("$.shippingPrice").value(response.getShippingPrice()))
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
                                fieldWithPath("description").type(JsonFieldType.STRING).description("제품 설명"),
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

        System.out.println("\nresult = " + result.getResponse().getContentAsString() + "\n");
    }

    @Test
    void getProducts() throws Exception {
        // given

        // Page<Product> 생성
        List<Product> products = new ArrayList<>();
        for (int i = 100; i >= 1; i--) {
            products.add(new Product());
        }
        Page<Product> productPage = new PageImpl<>(
                products, PageRequest.of(0, 40, Sort.by("productId").descending()), 3
        );

        // 응답 데이터 생성
        List<ProductSimpleResponseDto> response = new ArrayList<>();
        for (long i = 40; i >= 1; i--) {
            response.add(ProductSimpleResponseDto
                    .builder()
                    .productId(i)
                    .name("테스트 제품" + i)
                    .price(30000)
                    .photo("http://www.farminsight.net/news/photo/202011/6890_8654_2152.jpg")
                    .productStatus("판매 중")
                    .build());
        }

        given(productService.findProducts(
                Mockito.anyInt(),
                Mockito.anyInt(),
                Mockito.anyString(),
                Mockito.anyString(),
                Mockito.anyLong(),
                Mockito.anyString()
        )).willReturn(productPage);
        given(productMapper.productsToProductSimpleResponseDtos(Mockito.anyList())).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/products?page=1&size=40&categoryId=0&sort=productId&order=descending&keyword=")
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        MvcResult result = actions
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
                                parameterWithName("sort").description("정렬 기준 = productId(최신순, 기본값), name(상품이름순), price(가격순), brand(제조사순), likeCount(인기순)"),
                                parameterWithName("order").description("정렬 방법 = descending(내림차순, 기본값), ascending(오름차순)"),
                                parameterWithName("keyword").description("검색어 = 제품명, 브랜드안에서 검색")
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

        System.out.println("\nresult = " + result.getResponse().getContentAsString() + "\n");
    }

    @Test
    void patchProduct() throws Exception {
        // given
        ProductPatchDto patch = ProductPatchDto
                .builder()
                .productId(1L)
                .name("패치 테스트 제품명")
                .price(50000)
                .photo("data:image/jpeg;base64,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")
                .brand("패치 테스트 브랜드")
                .description("패치 테스트 제품 설명")
                .productStatus("FOR_SALE")
                .shippingCountry("FOREIGN_COUNTRY")
                .shippingMethod("INSTALLATION_SERVICE")
                .shippingPrice(50000)
                .build();

        doNothing().when(productService).updateProduct(Mockito.any(ProductPatchDto.class));
        String content = gson.toJson(patch);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(content)
        );

        // then
        MvcResult result = actions
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

        System.out.println("\nresult = " + result.getResponse().getContentAsString() + "\n");
    }
}
