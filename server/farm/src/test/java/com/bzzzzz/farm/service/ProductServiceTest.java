package com.bzzzzz.farm.service;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.model.dto.product.ProductPatchDto;
import com.bzzzzz.farm.model.dto.product.ProductSimpleResponseDto;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.repository.ProductRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    @DisplayName("제품 생성 테스트")
    void createProduct() {
        // given
        Product product = new Product();
        product.setName("테스트제품");
        product.setPrice(10000);
        product.setDescription("테스트 설명");
        product.setPhoto("테스트사진 url");
        product.setBrand("테스트브랜드");
        product.setShippingCountry(Product.ShippingCountry.KOREA);
        product.setShippingMethod(Product.ShippingMethod.PARCEL_SERVICE);
        product.setShippingPrice(3000);

        given(productRepository.save(Mockito.any(Product.class))).willReturn(product);

        // when
        Product result = productService.createProduct(product);

        // then
        assertEquals(product.getName(), result.getName());
        assertEquals(product.getPrice(), result.getPrice());
        assertEquals(product.getDescription(), result.getDescription());
        assertEquals(product.getPhoto(), result.getPhoto());
        assertEquals(product.getBrand(), result.getBrand());
        assertEquals(product.getShippingCountry(), result.getShippingCountry());
        assertEquals(product.getShippingMethod(), result.getShippingMethod());
        assertEquals(product.getShippingPrice(), result.getShippingPrice());
    }

    @Test
    @DisplayName("제품식별자로 제품찾기")
    void findProduct() {
        // given
        Product product = new Product();
        product.setProductId(1L);

        given(productRepository.findById(Mockito.anyLong())).willReturn(Optional.of(product));

        // when
        Product result = productService.findProduct(1L);

        // then
        assertEquals(1, result.getViewCount());
    }

    @Test
    @DisplayName("제품 전체가져오기")
    void findProducts() {
        // given
        int page = 0;
        int size = 10;
        String sort = "productId";
        String order = "descending";
        Long categoryId = null;
        String keyword = null;

        List<ProductSimpleResponseDto> dtos = new ArrayList<>();
        for (long i = 10; i >= 1; i--) {
            dtos.add(new ProductSimpleResponseDto(
                    i, "테스트제품" + i, 10000, "테스트사진url", "판매 중"
            ));
        }
        Page<ProductSimpleResponseDto> dtoPage = new PageImpl<>(dtos, PageRequest.of(page, size, Sort.by(sort).descending()), dtos.size());

        given(productRepository.searchAll(Mockito.isNull(), Mockito.isNull(), Mockito.any(Pageable.class))).willReturn(dtoPage);

        // when
        Page<ProductSimpleResponseDto> result = productService.findProducts(page, size, sort, order, categoryId, keyword);

        // then
        assertEquals(dtoPage.getTotalElements(), result.getTotalElements());
        assertEquals(dtoPage, result);
    }

    @Test
    @DisplayName("제품 업데이트")
    void updateProduct() {
        // given
        Product product = new Product();
        product.setProductId(1L);
        product.setName("테스트");
        product.setPrice(10000);
        product.setDescription("테스트 설명");
        product.setPhoto("테스트사진 url");
        product.setBrand("테스트브랜드");
        product.setShippingCountry(Product.ShippingCountry.FOREIGN_COUNTRY);
        product.setShippingMethod(Product.ShippingMethod.PARCEL_SERVICE);
        product.setShippingPrice(3000);

        ProductPatchDto patchDto = ProductPatchDto
                .builder()
                .productId(1L)
                .name("수정된테스트")
                .price(5000)
                .photo("수정된사진url")
                .brand("수정된브랜드")
                .description("수정된설명")
                .productStatus("FOR_SALE")
                .shippingCountry("KOREA")
                .shippingMethod("INSTALLATION_SERVICE")
                .shippingPrice(5000)
                .build();

        given(productRepository.findById(Mockito.anyLong())).willReturn(Optional.of(product));

        // when
        Product result = productService.updateProduct(patchDto);

        // then
        assertEquals(patchDto.getName(), result.getName());
        assertEquals(patchDto.getPrice(), result.getPrice());
        assertEquals(patchDto.getPhoto(), result.getPhoto());
        assertEquals(patchDto.getBrand(), result.getBrand());
        assertEquals(patchDto.getDescription(), result.getDescription());
        assertEquals(patchDto.getProductStatus(), result.getProductStatus().name());
        assertEquals(patchDto.getShippingCountry(), result.getShippingCountry().name());
        assertEquals(patchDto.getShippingMethod(), result.getShippingMethod().name());
        assertEquals(patchDto.getShippingPrice(), result.getShippingPrice());
    }

    @Test
    @DisplayName("제품 삭제")
    void deleteProduct() {
        // given
        long productId = 1L;

        Product product = new Product();
        product.setProductId(productId);

        given(productRepository.findById(Mockito.anyLong())).willReturn(Optional.of(product));
        doNothing().when(productRepository).delete(Mockito.any(Product.class));

        // when
        productService.deleteProduct(productId);

        // then
        verify(productRepository).findById(productId);
        verify(productRepository).delete(product);
    }

    @Test
    @DisplayName("제품존재여부-있으면 가져오기")
    void findVerifiedProduct1() {
        // given
        given(productRepository.findById(Mockito.anyLong())).willReturn(Optional.of(new Product()));

        // when
        Product product = productService.findVerifiedProduct(1L);

        // then
        assertNotNull(product);
    }

    @Test
    @DisplayName("제품존재여부-없으면 예외발생")
    void findVerifiedProduct2() {
        // given
        given(productRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(null));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> productService.findVerifiedProduct(1L));
        assertEquals(ExceptionCode.PRODUCT_NOT_FOUND, exception.getExceptionCode());
    }
}
