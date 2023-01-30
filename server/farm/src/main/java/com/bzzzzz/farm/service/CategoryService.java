package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.mapper.CategoryMapper;
import com.bzzzzz.farm.model.dto.category.CategoryPatchDto;
import com.bzzzzz.farm.model.dto.category.CategoryPostDto;
import com.bzzzzz.farm.model.dto.category.CategoryResponseDto;
import com.bzzzzz.farm.model.entity.Category;
import com.bzzzzz.farm.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @CacheEvict(value = {"findCategories", "getMain"}, allEntries = true)
    public Category createCategory(CategoryPostDto categoryPostDto) {
        verifyExistsCategory(categoryPostDto.getName());
        return categoryRepository.save(new Category(categoryPostDto.getName()));
    }

    @CacheEvict(value = {"findCategories", "getMain"}, allEntries = true)
    public Category updateCategory(CategoryPatchDto categoryPatchDto) {
        Category findCategory = findVerifiedCategory(categoryPatchDto.getCategoryId());

        Optional.ofNullable(categoryPatchDto.getName()).ifPresent(data -> findCategory.setName(data));
        Optional.ofNullable(categoryPatchDto.getSequenceNum()).ifPresent(data -> findCategory.setSequenceNum(data));

        return findCategory;
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "findCategories")
    public List<CategoryResponseDto> findCategories() {
        return categoryMapper.categoriesToCategoryResponseDtos(
                categoryRepository.findAll(Sort.by("sequenceNum"))
        );
    }

    @CacheEvict(value = {"findCategories", "getMain"}, allEntries = true)
    public void deleteCategory(long categoryId) {
        Category category = findVerifiedCategory(categoryId);

        if (category.getProductCategories().size() > 0) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_CATEGORY_EXISTS);
        }

        categoryRepository.delete(category);
    }

    /**
     * 서브 메서드
     */
    @Transactional(readOnly = true)
    private void verifyExistsCategory(String name) {
        Optional<Category> optionalCategory = categoryRepository.findByName(name);
        if (optionalCategory.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.CATEGORY_EXISTS);
        }
    }

    @Transactional(readOnly = true)
    public Category findVerifiedCategory(long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        return optionalCategory.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
    }
}
