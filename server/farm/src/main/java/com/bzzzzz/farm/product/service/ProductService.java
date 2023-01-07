package com.bzzzzz.farm.product.service;

import com.bzzzzz.farm.product.entity.Product;
import com.bzzzzz.farm.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public Page<Product> findProducts(int page) {
        Pageable pageable = PageRequest.of(page, 40, Sort.by("productId").descending());

        return productRepository.findAll(pageable);
    }

}
