package com.bzzzzz.farm.category.service;

import com.bzzzzz.farm.category.dto.CategoryPatchDto;
import com.bzzzzz.farm.category.entity.Category;
import com.bzzzzz.farm.category.repository.CategoryRepository;
import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
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

    public Category createCategory(Category category) {
        verifyExistsCategory(category.getName());
        return categoryRepository.save(category);
    }

    public Category updateCategory(CategoryPatchDto categoryPatchDto) {
        Category findCategory = findVerifiedCategory(categoryPatchDto.getCategoryId());

        Optional.ofNullable(categoryPatchDto.getName()).ifPresent(data -> findCategory.setName(data));
        Optional.ofNullable(categoryPatchDto.getSequenceNum()).ifPresent(data -> findCategory.setSequenceNum(data));

        return findCategory;
    }

    public List<Category> findCategories() {
        return categoryRepository.findAll(Sort.by("sequenceNum"));
    }

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
