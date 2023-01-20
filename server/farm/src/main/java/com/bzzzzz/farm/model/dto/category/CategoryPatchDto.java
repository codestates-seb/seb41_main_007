package com.bzzzzz.farm.model.dto.category;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class CategoryPatchDto {
    @Positive
    private Long categoryId;
    private Integer sequenceNum;
    private String name;
}
