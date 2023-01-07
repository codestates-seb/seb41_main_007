package com.bzzzzz.farm.product.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class ProductDto {
    @Getter
    public static class Post {
        @Setter
        private Long memberId;

        @NotBlank
        private String name;

        private int price;

        @NotBlank
        private String photo;

        @NotBlank
        private String brand;

        @NotBlank
        private String description;

        private List<ProductOptionDto.Post> productOptionPostDtos;
    }
}
