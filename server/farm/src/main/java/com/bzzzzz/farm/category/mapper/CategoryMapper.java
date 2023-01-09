package com.bzzzzz.farm.category.mapper;

import com.bzzzzz.farm.category.dto.CategoryPostDto;
import com.bzzzzz.farm.category.dto.CategoryResponseDto;
import com.bzzzzz.farm.category.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category categoryPostDtoToCategory(CategoryPostDto categoryPostDto);
    CategoryResponseDto categoryToCategoryResponseDto(Category category);
}
