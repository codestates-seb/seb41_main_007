package com.bzzzzz.farm.service;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.model.dto.product.ProductOptionPatchDto;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.repository.ProductOptionRepository;
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
public class ProductOptionServiceTest {
    @Mock
    private ProductOptionRepository productOptionRepository;
    @InjectMocks
    private ProductOptionService productOptionService;

    @Test
    @DisplayName("옵션 생성")
    void createProductOption() {
        // given
        ProductOption productOption = new ProductOption();

        given(productOptionRepository.save(Mockito.any(ProductOption.class))).willReturn(productOption);

        // when
        productOptionService.createProductOption(productOption);

        // then
        verify(productOptionRepository).save(productOption);
    }

    @Test
    @DisplayName("옵션 수정하기")
    void updateProductOption() {
        // given
        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(1L);
        productOption.setProductOptionName("수정전옵션");
        productOption.setPrice(10000);
        productOption.setStock(100);

        ProductOptionPatchDto patchDto = new ProductOptionPatchDto(1L, "수정후옵션", 5000, 90);

        given(productOptionRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(productOption));

        // when
        ProductOption result = productOptionService.updateProductOption(patchDto);

        // then
        assertEquals(patchDto.getProductOptionName(), result.getProductOptionName());
        assertEquals(patchDto.getPrice(), result.getPrice());
        assertEquals(patchDto.getStock(), result.getStock());
    }

    @Test
    @DisplayName("옵션 삭제하기-옵션이 2개 이상인 경우")
    void deleteProductOption1() {
        // given
        Product product = new Product();

        ProductOption productOption1 = new ProductOption();
        productOption1.setProductOptionId(1L);
        productOption1.setProductOptionName("옵션1");
        product.addProductOption(productOption1);

        ProductOption productOption2 = new ProductOption();
        productOption2.setProductOptionId(2L);
        productOption2.setProductOptionName("옵션2");
        product.addProductOption(productOption2);

        given(productOptionRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(productOption2));
        doNothing().when(productOptionRepository).delete(Mockito.any(ProductOption.class));

        // when
        productOptionService.deleteProductOption(2L);

        // then
        verify(productOptionRepository).findById(2L);
        verify(productOptionRepository).delete(productOption2);
    }

    @Test
    @DisplayName("옵션 삭제하기-옵션이 1개인 경우")
    void deleteProductOption2() {
        // given
        Product product = new Product();

        ProductOption productOption = new ProductOption();
        productOption.setProductOptionId(1L);
        productOption.setProductOptionName("옵션1");
        product.addProductOption(productOption);

        given(productOptionRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(productOption));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> productOptionService.deleteProductOption(1L));
        assertEquals(ExceptionCode.PRODUCT_OPTION_CONFLICT, exception.getExceptionCode());
    }

    @Test
    @DisplayName("옵션 삭제하기-옵션이 없을경우")
    void deleteProductOption3() {
        // given
        given(productOptionRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(null));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> productOptionService.deleteProductOption(1L));
        assertEquals(ExceptionCode.PRODUCT_OPTION_NOT_FOUND, exception.getExceptionCode());
    }
}
