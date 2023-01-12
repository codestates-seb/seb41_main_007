package com.bzzzzz.farm.dto;

import com.bzzzzz.farm.category.dto.CategoryResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ResponseDto<T> {
    private T data;
    private List<CategoryResponseDto> categoryResponseDtos;
}