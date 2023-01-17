package com.bzzzzz.farm.domain.category.mapper;

import com.bzzzzz.farm.domain.category.dto.CategoryPostDto;
import com.bzzzzz.farm.domain.category.dto.CategoryResponseDto;
import com.bzzzzz.farm.domain.category.entity.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category categoryPostDtoToCategory(CategoryPostDto categoryPostDto);
    CategoryResponseDto categoryToCategoryResponseDto(Category category);
    List<CategoryResponseDto> categoriesToCategoryResponseDtos(List<Category> categories);
}
