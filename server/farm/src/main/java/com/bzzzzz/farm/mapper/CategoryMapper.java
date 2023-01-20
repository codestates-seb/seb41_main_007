package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.category.CategoryPostDto;
import com.bzzzzz.farm.model.dto.category.CategoryResponseDto;
import com.bzzzzz.farm.model.entity.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category categoryPostDtoToCategory(CategoryPostDto categoryPostDto);
    CategoryResponseDto categoryToCategoryResponseDto(Category category);
    List<CategoryResponseDto> categoriesToCategoryResponseDtos(List<Category> categories);
}
