package com.bzzzzz.farm.product.service;

import com.bzzzzz.farm.category.entity.Category;
import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.product.dto.ProductCategoryPatchDto;
import com.bzzzzz.farm.product.entity.ProductCategory;
import com.bzzzzz.farm.product.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    public void updateProductCategory(ProductCategoryPatchDto productCategoryPatchDto) {

        ProductCategory findProductCategory = findVerifiedProductCategory(productCategoryPatchDto.getProductCategoryId());

        Optional.ofNullable(productCategoryPatchDto.getCategoryId()).ifPresent(data -> findProductCategory.setCategory(new Category(data)));
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private ProductCategory findVerifiedProductCategory(long productCategoryId) {
        Optional<ProductCategory> optionalProductCategory = productCategoryRepository.findById(productCategoryId);
        return optionalProductCategory.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_CATEGORY_NOT_FOUND));
    }
}
