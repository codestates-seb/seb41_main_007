package com.bzzzzz.farm.model.dto.category;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class CategoryPostDto {
    @NotBlank
    private String name;
}
