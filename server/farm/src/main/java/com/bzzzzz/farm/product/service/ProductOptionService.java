package com.bzzzzz.farm.product.service;

import com.bzzzzz.farm.product.dto.ProductOptionPatchDto;
import com.bzzzzz.farm.product.entity.ProductOption;
import com.bzzzzz.farm.product.repository.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductOptionService {
    private final ProductOptionRepository productOptionRepository;

    public void updateProductOption(ProductOptionPatchDto productOptionPatchDto) {

        ProductOption findProductOption = findVerifiedProductOption(productOptionPatchDto.getProductOptionId());

        Optional.ofNullable(productOptionPatchDto.getProductOptionName()).ifPresent(data -> findProductOption.setProductOptionName(data));
        Optional.ofNullable(productOptionPatchDto.getPrice()).ifPresent(data -> findProductOption.setPrice(data));
        Optional.ofNullable(productOptionPatchDto.getStock()).ifPresent(data -> findProductOption.setStock(data));
    }

    @Transactional(readOnly = true)
    private ProductOption findVerifiedProductOption(long productOptionId) {
        Optional<ProductOption> optionalProductOption = productOptionRepository.findById(productOptionId);
        return optionalProductOption.orElseThrow(() -> new RuntimeException("PRODUCT_OPTION_NOT_FOUND")); //FiXME 병수님 예외코드 들어오면 고칠 것
    }
}