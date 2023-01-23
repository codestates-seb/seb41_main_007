package com.bzzzzz.farm.service;

import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.model.dto.product.ProductCategoryPatchDto;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.entity.ProductCategory;
import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    public ProductCategory createProductCategory(ProductCategory productCategory) {

        verifyExistsProductCategory(productCategory.getProduct(), productCategory.getCategory());

        return productCategoryRepository.save(productCategory);
    }

    public ProductCategory updateProductCategory(ProductCategoryPatchDto productCategoryPatchDto) {

        ProductCategory findProductCategory = findVerifiedProductCategory(productCategoryPatchDto.getProductCategoryId());

        Optional.ofNullable(productCategoryPatchDto.getCategoryId()).ifPresent(data -> findProductCategory.setCategory(new Category(data)));

        return productCategoryRepository.save(findProductCategory);
    }

    public void deleteProductCategory(long productCategoryId) {
        ProductCategory productCategory = findVerifiedProductCategory(productCategoryId);

        if (productCategory.getProduct().getProductCategories().size() <= 1) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_CATEGORY_CONFLICT);
        }

        productCategoryRepository.delete(productCategory);
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private ProductCategory findVerifiedProductCategory(long productCategoryId) {
        Optional<ProductCategory> optionalProductCategory = productCategoryRepository.findById(productCategoryId);
        return optionalProductCategory.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_CATEGORY_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    private void verifyExistsProductCategory(Product product, Category category) {
        Optional<ProductCategory> optionalProductCategory = productCategoryRepository.findByProductAndCategory(product, category);
        if (optionalProductCategory.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_CATEGORY_EXISTS);
        }
    }

}