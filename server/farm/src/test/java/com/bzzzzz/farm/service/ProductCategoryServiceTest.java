package com.bzzzzz.farm.service;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.model.dto.product.ProductCategoryPatchDto;
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
    @InjectMocks
    private ProductCategoryService productCategoryService;

    @Test
    @DisplayName("카테고리에 제품 담기-해피케이스")
    void createProductCategory1() {
        // given
        Product product = new Product();
        product.setProductId(1L);
        Category category = new Category();
        category.setCategoryId(1L);

        ProductCategory productCategory = new ProductCategory();
        productCategory.setProduct(product);
        productCategory.setCategory(category);

        ProductCategory savedProductCategory = new ProductCategory();
        savedProductCategory.setProductCategoryId(1L);
        savedProductCategory.setProduct(product);
        savedProductCategory.setCategory(category);

        given(productCategoryRepository.findByProductAndCategory(Mockito.any(Product.class), Mockito.any(Category.class))).willReturn(Optional.ofNullable(null));
        given(productCategoryRepository.save(Mockito.any(ProductCategory.class))).willReturn(savedProductCategory);

        // when
        ProductCategory result = productCategoryService.createProductCategory(productCategory);

        // then
        assertEquals(savedProductCategory.getProductCategoryId(), result.getProductCategoryId());
        assertEquals(savedProductCategory.getProduct(), result.getProduct());
        assertEquals(savedProductCategory.getCategory(), result.getCategory());
    }

    @Test
    @DisplayName("카테고리에 제품 담기-이미존재할경우")
    void createProductCategory2() {
        // given
        Product product = new Product();
        product.setProductId(1L);
        Category category = new Category();
        category.setCategoryId(1L);

        ProductCategory findProductCategory = new ProductCategory();
        findProductCategory.setProductCategoryId(1L);
        findProductCategory.setProduct(product);
        findProductCategory.setCategory(category);

        ProductCategory productCategory = new ProductCategory();
        productCategory.setProduct(product);
        productCategory.setCategory(category);

        given(productCategoryRepository.findByProductAndCategory(Mockito.any(Product.class), Mockito.any(Category.class))).willReturn(Optional.ofNullable(findProductCategory));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> productCategoryService.createProductCategory(productCategory));
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
        given(productCategoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(findProductCategory));
        given(productCategoryRepository.findByProductAndCategory(Mockito.any(Product.class), Mockito.any(Category.class))).willReturn(Optional.ofNullable(null));
        given(productCategoryRepository.save(Mockito.any(ProductCategory.class))).willReturn(findProductCategory);

        // when
        ProductCategory result = productCategoryService.updateProductCategory(patchDto);

        // then
        assertEquals(patchDto.getCategoryId(), result.getCategory().getCategoryId());
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
