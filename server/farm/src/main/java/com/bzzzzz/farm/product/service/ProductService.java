package com.bzzzzz.farm.product.service;

import com.bzzzzz.farm.product.dto.ProductPatchDto;
import com.bzzzzz.farm.product.entity.Product;
import com.bzzzzz.farm.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public Product findProduct(long productId) {
        return findVerifiedProduct(productId);
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

    public Product updateProduct(Product product) {

        Product findProduct = findVerifiedProduct(product.getProductId());

        Optional.ofNullable(product.getName()).ifPresent(data -> findProduct.setName(data));
        Optional.ofNullable(product.getPrice()).ifPresent(data -> findProduct.setPrice(data));
        Optional.ofNullable(product.getPhoto()).ifPresent(data -> findProduct.setPhoto(data));
        Optional.ofNullable(product.getBrand()).ifPresent(data -> findProduct.setBrand(data));
        Optional.ofNullable(product.getDescription()).ifPresent(data -> findProduct.setDescription(data));
        Optional.ofNullable(product.getShippingCountry()).ifPresent(data -> findProduct.setShippingCountry(data));
        Optional.ofNullable(product.getShippingMethod()).ifPresent(data -> findProduct.setShippingMethod(data));
        Optional.ofNullable(product.getShippingPrice()).ifPresent(data -> findProduct.setShippingPrice(data));
        Optional.ofNullable(product.getProductOptions()).ifPresent(data -> findProduct.setProductOptions(data));

        return productRepository.save(findProduct);
    }

    public void deleteProduct(long productId) {
        productRepository.delete(findVerifiedProduct(productId));
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private Product findVerifiedProduct(long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.orElseThrow(() -> new RuntimeException("PRODUCT_NOT_FOUND")); //FiXME 병수님 예외코드 들어오면 고칠 것
    }

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
