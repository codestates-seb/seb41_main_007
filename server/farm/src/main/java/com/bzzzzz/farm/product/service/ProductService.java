package com.bzzzzz.farm.product.service;

import com.bzzzzz.farm.member.entity.Member;
import com.bzzzzz.farm.member.service.MemberService;
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
    private final ProductOptionService productOptionService;
    private final MemberService memberService;

    public Product createProduct(Product product) {
        Member member = memberService.getLoginMember();
        product.setMember(member);
        return productRepository.save(product);
    }

    public Product findProduct(long productId) {
        Product findProduct = findVerifiedProduct(productId);
        findProduct.addViewCount();
        return findProduct;
    }

    @Transactional(readOnly = true)
    public Page<Product> findProducts(int page, int size, String sort, String order, String keyword) {
        // 허용 값 이외의 값은 모두 디폴트 값으로 만들어 Pageable 객체를 생성
        Pageable pageable = createPageable(page, size, verifySort(sort), order);

        // 키워드가 있을 경우
        if (keyword.length() != 0) {
            return productRepository.findAllByNameContainsOrBrandContains(keyword, keyword, pageable);
        }

        // 키워드가 없을 경우
        return productRepository.findAll(pageable);
    }

    public void updateProduct(ProductPatchDto productPatchDto) {

        Product findProduct = findVerifiedProduct(productPatchDto.getProductId());

        Optional.ofNullable(productPatchDto.getName()).ifPresent(data -> findProduct.setName(data));
        Optional.ofNullable(productPatchDto.getPrice()).ifPresent(data -> findProduct.setPrice(data));
        Optional.ofNullable(productPatchDto.getPhoto()).ifPresent(data -> findProduct.setPhoto(data));
        Optional.ofNullable(productPatchDto.getBrand()).ifPresent(data -> findProduct.setBrand(data));
        Optional.ofNullable(productPatchDto.getDescription()).ifPresent(data -> findProduct.setDescription(data));
        Optional.ofNullable(productPatchDto.getShippingCountry()).ifPresent(data -> findProduct.setShippingCountry(Product.ShippingCountry.valueOf(data)));
        Optional.ofNullable(productPatchDto.getShippingMethod()).ifPresent(data -> findProduct.setShippingMethod(Product.ShippingMethod.valueOf(data)));
        Optional.ofNullable(productPatchDto.getShippingPrice()).ifPresent(data -> findProduct.setShippingPrice(data));

        // 옵션부분은 따로 빼서 전달
        Optional.ofNullable(productPatchDto.getProductOptionPatchDtos())
                .ifPresent(datas -> datas.stream()
                        .forEach(productOptionPatchDto -> productOptionService.updateProductOption(productOptionPatchDto)));
    }

    public void deleteProduct(long productId) {
        productRepository.delete(findVerifiedProduct(productId));
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    public Product findVerifiedProduct(long productId) {
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
