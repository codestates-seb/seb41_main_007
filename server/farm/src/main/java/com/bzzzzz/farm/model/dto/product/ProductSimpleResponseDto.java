package com.bzzzzz.farm.model.dto.product;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductSimpleResponseDto {

    private Long productId;

    private String name;

    private int price;

    private String photo;

    private String productStatus;

    private Double rating;

    @QueryProjection
    public ProductSimpleResponseDto(Long productId,
                                    String name,
                                    int price,
                                    String photo,
                                    String productStatus,
                                    Double rating) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.photo = photo;
        this.productStatus = productStatus;
        this.rating = rating;
    }
}
