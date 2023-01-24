package com.bzzzzz.farm.service;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.model.dto.product.ProductPatchDto;
import com.bzzzzz.farm.model.dto.product.ProductSimpleResponseDto;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.repository.ProductRepository;
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
    public Page<ProductSimpleResponseDto> findProducts(int page, int size, String sort, String order, Long categoryId, String keyword) {
        // 허용 값 이외의 값은 모두 디폴트 값으로 만들어 Pageable 객체를 생성
        Pageable pageable = order.equals("ascending")
                ? PageRequest.of(page, size, Sort.by(sort).ascending())
                : PageRequest.of(page, size, Sort.by(sort).descending());

        return productRepository.searchAll(categoryId, keyword, pageable);
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

}
