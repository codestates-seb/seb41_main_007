package com.bzzzzz.farm.domain.product.service;

import com.bzzzzz.farm.domain.product.repository.ProductRepository;
import com.bzzzzz.farm.global.exception.BusinessLogicException;
import com.bzzzzz.farm.global.exception.ExceptionCode;
import com.bzzzzz.farm.domain.product.dto.ProductPatchDto;
import com.bzzzzz.farm.domain.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
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

    @CacheEvict(value = "getMain", allEntries = true)
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product findProduct(long productId) {
        Product findProduct = findVerifiedProduct(productId);
        findProduct.addViewCount();
        return findProduct;
    }

    @Transactional(readOnly = true)
    public Page<Product> findProducts(int page, int size, String sort, String order, long categoryId, String keyword) {
        // 허용 값 이외의 값은 모두 디폴트 값으로 만들어 Pageable 객체를 생성
        Pageable pageable = createPageable(page, size, verifySort(sort), order);

        if (categoryId > 0) {
            return keyword.length() != 0
                    // 카테고리: O, 키워드: O
                    ? productRepository.findAllByProductCategories_Category_CategoryIdAndNameContainsOrProductCategories_Category_CategoryIdAndBrandContains(categoryId, keyword, categoryId, keyword, pageable)
                    // 카테고리: O, 키워드: X
                    : productRepository.findAllByProductCategories_Category_CategoryId(categoryId, pageable);
        } else {
            return keyword.length() != 0
                    // 카테고리: X, 키워드: O
                    ? productRepository.findAllByNameContainsOrBrandContains(keyword, keyword, pageable)
                    // 카테고리: X, 키워드: X
                    : productRepository.findAll(pageable);
        }

        // 키워드가 없을 경우;
    }

    @CacheEvict(value = "getMain", allEntries = true)
    public void updateProduct(ProductPatchDto productPatchDto) {

        Product findProduct = findVerifiedProduct(productPatchDto.getProductId());

        Optional.ofNullable(productPatchDto.getName()).ifPresent(data -> findProduct.setName(data));
        Optional.ofNullable(productPatchDto.getPrice()).ifPresent(data -> findProduct.setPrice(data));
        Optional.ofNullable(productPatchDto.getPhoto()).ifPresent(data -> findProduct.setPhoto(data));
        Optional.ofNullable(productPatchDto.getBrand()).ifPresent(data -> findProduct.setBrand(data));
        Optional.ofNullable(productPatchDto.getDescription()).ifPresent(data -> findProduct.setDescription(data));
        Optional.ofNullable(productPatchDto.getProductStatus()).ifPresent(data -> findProduct.setProductStatus(Product.ProductStatus.valueOf(data)));
        Optional.ofNullable(productPatchDto.getShippingCountry()).ifPresent(data -> findProduct.setShippingCountry(Product.ShippingCountry.valueOf(data)));
        Optional.ofNullable(productPatchDto.getShippingMethod()).ifPresent(data -> findProduct.setShippingMethod(Product.ShippingMethod.valueOf(data)));
        Optional.ofNullable(productPatchDto.getShippingPrice()).ifPresent(data -> findProduct.setShippingPrice(data));
    }

    @CacheEvict(value = "getMain", allEntries = true)
    public void deleteProduct(long productId) {
        productRepository.delete(findVerifiedProduct(productId));
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    public Product findVerifiedProduct(long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
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
            case "soldCount":
                break;
            default:
                sort = "productId";
        }

        return sort;
    }

    private Pageable createPageable(int page, int size, String sort, String order) {
        if (order.equals("ascending")) {
            return PageRequest.of(page, size, Sort.by(sort).ascending());
        }
        return PageRequest.of(page, size, Sort.by(sort).descending());
    }

}
