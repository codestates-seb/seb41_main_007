package com.bzzzzz.farm.repository.querydsl;

import com.bzzzzz.farm.model.dto.product.ProductSimpleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryCustom {
    Page<ProductSimpleResponseDto> searchAll(Long categoryId, String keyword, Pageable pageable);
}
