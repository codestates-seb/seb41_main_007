package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.CategoryMapper;
import com.bzzzzz.farm.model.dto.category.CategoryPatchDto;
import com.bzzzzz.farm.model.dto.category.CategoryPostDto;
import com.bzzzzz.farm.model.dto.category.CategoryResponseDto;
import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.model.entity.ProductCategory;
import com.bzzzzz.farm.repository.CategoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private CategoryMapper categoryMapper;
    @InjectMocks
    private CategoryService categoryService;

    @Test
    @DisplayName("카테고리 등록하기-해피케이스")
    void createCategory1() {
        // given
        CategoryPostDto categoryPostDto = new CategoryPostDto("새로운 카테고리");

        given(categoryRepository.findByName(Mockito.anyString())).willReturn(Optional.ofNullable(null));
        given(categoryRepository.save(Mockito.any())).willReturn(new Category(categoryPostDto.getName()));

        // when
        Category result = categoryService.createCategory(categoryPostDto);

        // then
        assertEquals(categoryPostDto.getName(), result.getName());
    }

    @Test
    @DisplayName("카테고리 등록하기-동일한 카테고리가 존재할 경우")
    void createCategory2() {
        // given
        CategoryPostDto categoryPostDto = new CategoryPostDto("새로운 카테고리");

        given(categoryRepository.findByName(Mockito.anyString())).willReturn(Optional.ofNullable(new Category(categoryPostDto.getName())));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> categoryService.createCategory(categoryPostDto));
        assertEquals(ExceptionCode.CATEGORY_EXISTS, exception.getExceptionCode());
    }

    @Test
    @DisplayName("카테고리 수정하기")
    void updateCategory() {
        // given
        CategoryPatchDto categoryPatchDto = new CategoryPatchDto(1L, 3, "수정할 카테고리");

        Category findCategory = new Category(categoryPatchDto.getCategoryId());
        findCategory.setSequenceNum(0);
        findCategory.setName("수정전 카테고리");

        given(categoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(findCategory));

        // when
        Category result = categoryService.updateCategory(categoryPatchDto);

        // then
        assertEquals(categoryPatchDto.getSequenceNum(), result.getSequenceNum());
        assertEquals(categoryPatchDto.getName(), result.getName());
    }

    @Test
    @DisplayName("카테고리 전체 가져오기")
    void findCategories() {
        // given
        CategoryResponseDto categoryResponseDto1 = CategoryResponseDto
                .builder()
                .categoryId(1L)
                .sequenceNum(0)
                .name("카테고리1")
                .modifiedAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();
        CategoryResponseDto categoryResponseDto2 = CategoryResponseDto
                .builder()
                .categoryId(2L)
                .sequenceNum(1)
                .name("카테고리2")
                .modifiedAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();

        given(categoryRepository.findAll(Sort.by("sequenceNum"))).willReturn(List.of());
        given(categoryMapper.categoriesToCategoryResponseDtos(Mockito.anyList())).willReturn(List.of(categoryResponseDto1, categoryResponseDto2));

        // when
        // then
        assertEquals(2, categoryService.findCategories().size());
    }

    @Test
    @DisplayName("카테고리 삭제하기-해피케이스")
    void deleteCategory1() {
        // given
        Category category = new Category(1L);

        given(categoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(category));

        // when
        categoryService.deleteCategory(1L);

        // then
        verify(categoryRepository, times(1)).delete(category);
    }

    @Test
    @DisplayName("카테고리 삭제하기-카테고리에 제품이 존재하는 경우")
    void deleteCategory2() {
        // given
        Category category = new Category(1L);
        category.setProductCategories(List.of(new ProductCategory()));

        given(categoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(category));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> categoryService.deleteCategory(1L));
        assertEquals(ExceptionCode.PRODUCT_CATEGORY_EXISTS, exception.getExceptionCode());
    }

    @Test
    @DisplayName("유효한 카테고리가 존재하는가-없는 경우")
    void findVerifiedCategory() {
        // given
        given(categoryRepository.findById(Mockito.anyLong())).willReturn(Optional.ofNullable(null));

        // when
        // then
        BusinessLogicException exception = assertThrows(BusinessLogicException.class, () -> categoryService.findVerifiedCategory(1L));
        assertEquals(ExceptionCode.CATEGORY_NOT_FOUND, exception.getExceptionCode());
    }
}
