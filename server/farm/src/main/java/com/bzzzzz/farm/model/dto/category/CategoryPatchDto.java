package com.bzzzzz.farm.model.dto.category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryPatchDto {
    @Positive
    private Long categoryId;
    private Integer sequenceNum;
    private String name;
}
