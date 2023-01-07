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
    public Page<Product> findProducts(int page, String sort, String order, String keyword) {
        // 허용 값 이외의 값은 모두 디폴트 값으로 만들어 Pageable 객체를 생성
        Pageable pageable = createPageable(page, verifySort(sort), order);

        // 키워드가 있을 경우
        if (keyword.length() != 0) {
            return productRepository.findAllByNameContainsOrBrandContains(keyword, keyword, pageable);
        }

        // 키워드가 없을 경우
        return productRepository.findAll(pageable);
    }

    /**
     * 서브 메서드
     */
    private String verifySort(String sort) {
        // 허용 파라미터 외의 값이 들어올 경우 모두 productId로 간주
        switch (sort) {
            case "name":
                break;
            case "price":
                break;
            case "brand":
                break;
            case "likeCount":
                break;
            default:
                sort = "productId";
        }

        return sort;
    }

    private Pageable createPageable(int page, String sort, String order) {
        if (order.equals("ascending")) {
            return PageRequest.of(page, 40, Sort.by(sort).ascending());
        }
        return PageRequest.of(page, 40, Sort.by(sort).descending());
    }

}
