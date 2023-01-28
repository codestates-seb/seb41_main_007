package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.ProductMapper;
import com.bzzzzz.farm.model.dto.product.ProductOptionPatchDto;
import com.bzzzzz.farm.model.dto.product.ProductOptionPostDto;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.repository.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductOptionService {
    private final ProductOptionRepository productOptionRepository;
    private final ProductMapper productMapper;

    public void createProductOption(ProductOptionPostDto productOptionPostDto) {
        productOptionRepository.save(
                productMapper.productOptionPostDtoToProductOption(productOptionPostDto)
        );
    }

    public ProductOption updateProductOption(ProductOptionPatchDto productOptionPatchDto) {

        ProductOption findProductOption = findVerifiedProductOption(productOptionPatchDto.getProductOptionId());

        Optional.ofNullable(productOptionPatchDto.getProductOptionName()).ifPresent(data -> findProductOption.setProductOptionName(data));
        Optional.ofNullable(productOptionPatchDto.getPrice()).ifPresent(data -> findProductOption.setPrice(data));
        Optional.ofNullable(productOptionPatchDto.getStock()).ifPresent(data -> findProductOption.setStock(data));

        return findProductOption;
    }

    public void deleteProductOption(long productOptionId) {
        ProductOption productOption = findVerifiedProductOption(productOptionId);

        if (productOption.getProduct().getProductOptions().size() <= 1) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_OPTION_CONFLICT);
        }

        productOptionRepository.delete(productOption);
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    public ProductOption findVerifiedProductOption(long productOptionId) {
        Optional<ProductOption> optionalProductOption = productOptionRepository.findById(productOptionId);
        return optionalProductOption.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_OPTION_NOT_FOUND));
    }
}
