package com.bzzzzz.farm.repository.querydsl;

import com.bzzzzz.farm.model.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryCustom {
    Page<Product> searchAll(Long categoryId, String keyword, Pageable pageable);
}
