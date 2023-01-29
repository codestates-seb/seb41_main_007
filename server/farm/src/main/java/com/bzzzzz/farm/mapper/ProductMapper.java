package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.entity.ProductCategory;
import com.bzzzzz.farm.model.entity.ProductOption;
import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.model.dto.product.*;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    default Product productPostDtoToProduct(ProductPostDto productPostDto) {
        if (productPostDto == null) {
            return null;
        }

        Product product = new Product();

        product.setName(productPostDto.getName());
        product.setPrice(productPostDto.getPrice());
        product.setBody(productPostDto.getBody());
        product.setDescription(productPostDto.getDescription());
        product.setPhoto(productPostDto.getPhoto());
        product.setBrand(productPostDto.getBrand());
        product.setShippingCountry(Product.ShippingCountry.valueOf(productPostDto.getShippingCountry()));
        product.setShippingMethod(Product.ShippingMethod.valueOf(productPostDto.getShippingMethod()));
        product.setShippingPrice(productPostDto.getShippingPrice());

        // ProductCategory 추가
//        productPostDto.getProductCategoryPostDtos().stream()
//                .forEach(productCategoryPostDto ->
//                        product.addProductCategory(productCategoryPostDtoToProductCategory(productCategoryPostDto)));

        // 옵션값들 추가
//        productPostDto.getProductOptionPostDtos().stream()
//                .forEach(productOptionPostDto ->
//                        product.addProductOption(productOptionPostDtoToProductOption(productOptionPostDto)));

        return product;
    }

    default ProductDetailResponseDto productToProductDetailResponseDto(Product product, Boolean isLiked) {
        if (product == null) {
            return null;
        }

        return ProductDetailResponseDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .price(product.getPrice())
                .photo(product.getPhoto())
                .shippingCountry(product.getShippingCountry().getShippingType())
                .shippingMethod(product.getShippingMethod().getShippingMethod())
                .shippingPrice(product.getShippingPrice())
                .body(product.getBody())
                .description(product.getDescription())
                .brand(product.getBrand())
                .productStatus(product.getProductStatus().getStatus())
                .viewCount(product.getViewCount())
                .likeCount(product.getLikes().size())
                .soldCount(product.getSoldCount())
                .isLiked(isLiked)
                .productCategoryResponseDtos(product.getProductCategories().stream()
                        .map(productCategory -> productCategoryToProductCategoryResponseDto(productCategory))
                        .collect(Collectors.toList()))
                .productOptionResponseDtos(product.getProductOptions().stream()
                        .map(productOption -> productOptionToProductOptionResponseDto(productOption))
                        .collect(Collectors.toList()))
                .build();
    }

    default ProductCategoryResponseDto productCategoryToProductCategoryResponseDto(ProductCategory productCategory) {
        if (productCategory == null) {
            return null;
        }

        return ProductCategoryResponseDto.builder()
                .productCategoryId(productCategory.getProductCategoryId())
                .categoryId(productCategory.getCategory().getCategoryId())
                .name(productCategory.getCategory().getName())
                .build();
    }

    ProductCategory productCategoryPostDtoToProductCategory(ProductCategoryPostDto productCategoryPostDto);


    ProductOption productOptionPostDtoToProductOption(ProductOptionPostDto productOptionPostDto);

    ProductOptionResponseDto productOptionToProductOptionResponseDto(ProductOption productOption);
}
