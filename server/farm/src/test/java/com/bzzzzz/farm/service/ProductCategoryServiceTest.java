package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.ProductMapper;
import com.bzzzzz.farm.model.dto.product.ProductCategoryPatchDto;
import com.bzzzzz.farm.model.dto.product.ProductCategoryPostDto;
import com.bzzzzz.farm.model.dto.product.ProductCategoryResponseDto;
import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductCategory;
import com.bzzzzz.farm.repository.ProductCategoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ProductCategoryServiceTest {
    @Mock
    private ProductCategoryRepository productCategoryRepository;
    @Mock
    private ProductMapper productMapper;
    @InjectMocks
    private ProductCategoryService productCategoryService;

    @Test
    @DisplayName("카테고리에 제품 담기-해피케이스")
    void createProductCategory1() {
        // given
        ProductCategoryPostDto productCategoryPostDto = new ProductCategoryPostDto(3L, 1L);

        ProductCategory productCategory = new ProductCategory();
        productCategory.setProduct(new Product());
        productCategory.setCategory(new Category());

        ProductCategoryResponseDto productCategoryResponseDto = ProductCategoryResponseDto
                .builder()
                .productCategoryId(1L)
                .categoryId(1L)
                .build();

        given(productMapper.productCategoryPostDtoToProductCategory(Mockito.any(ProductCategoryPostDto.class))).willReturn(productCategory);
        given(productCategoryRepository.findByProductAndCategory(Mockito.any(Product.class), Mockito.any(Category.class))).willReturn(Optional.ofNullable(null));
        given(productCategoryRepository.save(Mockito.any(ProductCategory.class))).willReturn(new ProductCategory());
        given(productMapper.productCategoryToProductCategoryResponseDto(Mockito.any(ProductCategory.class))).willReturn(productCategoryResponseDto);

        // when
        ProductCategoryResponseDto result = productCategoryService.createProductCategory(productCategoryPostDto);

        // then
        assertEquals(productCategoryPostDto.getCategory().getCategoryId(), result.getCategoryId());
    }

    @Test
    @DisplayName("카테고리에 제품 담기-이미존재할경우")
    void createProductCategory2() {
        // given
        Product product = new Product();
        product.setProductId(1L);
        Category category = new Category();
        category.setCategoryId(1L);

        ProductCategory productCategory = new ProductCategory();
        productCategory.setProductCategoryId(1L);
        productCategory.setProduct(product);
        productCategory.setCategory(category);

        given(productMapper.productCategoryPostDtoToProductCategory(Mockito.any(ProductCategoryPostDto.class))).willReturn(productCategory);
        given(productCategoryRepository.findByProductAndCategory(Mockito.any(Product.class), Mockito.any(Category.class))).willReturn(Optional.ofNullable(productCategory));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> productCategoryService.createProductCategory(new ProductCategoryPostDto()));
        assertEquals(ExceptionCode.PRODUCT_CATEGORY_EXISTS, exception.getExceptionCode());
    }

    @Test
    @DisplayName("제품의 카테고리 수정하기-해피케이스")
    void updateProductCategory1() {
        // given
        Product product = new Product(); // 타겟상품
        product.setProductId(1L);

        Category category1 = new Category(1L);
        Category category2 = new Category(2L);

        ProductCategory findProductCategory = new ProductCategory();
        findProductCategory.setProductCategoryId(1L);
        findProductCategory.setProduct(product);
        findProductCategory.setCategory(category1);

        ProductCategoryPatchDto patchDto = new ProductCategoryPatchDto(findProductCategory.getProductCategoryId(), category2.getCategoryId());
        ProductCategoryResponseDto productCategoryResponseDto = ProductCategoryResponseDto
                .builder()
                .categoryId(category2.getCategoryId())
                .productCategoryId(5L)
                .build();

        given(productCategoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(findProductCategory));
        given(productCategoryRepository.findByProductAndCategory(Mockito.any(Product.class), Mockito.any(Category.class))).willReturn(Optional.ofNullable(null));
        given(productCategoryRepository.save(Mockito.any(ProductCategory.class))).willReturn(findProductCategory);
        given(productMapper.productCategoryToProductCategoryResponseDto(Mockito.any(ProductCategory.class))).willReturn(productCategoryResponseDto);

        // when
        ProductCategoryResponseDto result = productCategoryService.updateProductCategory(patchDto);

        // then
        assertEquals(patchDto.getCategoryId(), result.getCategoryId());
    }

    @Test
    @DisplayName("제품의 카테고리 수정하기-객체가 존재하지않는 경우")
    void updateProductCategoryId2() {
        // given
        ProductCategoryPatchDto patchDto = new ProductCategoryPatchDto(1L, 2L);

        given(productCategoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(null));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> productCategoryService.updateProductCategory(patchDto));
        assertEquals(ExceptionCode.PRODUCT_CATEGORY_NOT_FOUND, exception.getExceptionCode());
    }

    @Test
    @DisplayName("카테고리에서 제품 제외하기-해피케이스")
    void deleteProductCategory1() {
        // given
        Product product = new Product();

        ProductCategory productCategory1 = new ProductCategory();
        product.addProductCategory(productCategory1);

        ProductCategory productCategory2 = new ProductCategory();
        product.addProductCategory(productCategory2);

        given(productCategoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(productCategory1));
        doNothing().when(productCategoryRepository).delete(Mockito.any(ProductCategory.class));

        // when
        productCategoryService.deleteProductCategory(1L);

        // then
        verify(productCategoryRepository).delete(productCategory1);
    }

    @Test
    @DisplayName("카테고리에서 제품 제외하기-제품이 담긴 카테고리가 1개인 경우")
    void deleteProductCategory2() {
        // given
        Product product = new Product();

        ProductCategory productCategory1 = new ProductCategory();
        product.addProductCategory(productCategory1);

        given(productCategoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(productCategory1));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> productCategoryService.deleteProductCategory(1L));
        assertEquals(ExceptionCode.PRODUCT_CATEGORY_CONFLICT, exception.getExceptionCode());
    }
}
