package com.bzzzzz.farm.category.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class CategoryPatchDto {
    @Positive
    private Long categoryId;

    private String name;
}
