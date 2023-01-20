package com.bzzzzz.farm.domain.product.repository;

import com.bzzzzz.farm.domain.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    //Todo: 쿼리DSL 꼭해보자!!
    Page<Product> findAllByNameContainsOrBrandContains(String name, String brand, Pageable pageable);

    // 카테고리아이디 값을 이용해서 제품리스트를 검색
    Page<Product> findAllByProductCategories_Category_CategoryId(long categoryId, Pageable pageable);

    @Query("select p from Product p inner join ProductCategory pc on p.productId = pc.product.productId " +
            "where pc.category.categoryId= :id")
    Page<Product> findAllByCategory(@Param("id") long categoryId, Pageable pageable);

    // 카테고리아이디 And (제품명 Or 브랜드)
    Page<Product> findAllByProductCategories_Category_CategoryIdAndNameContainsOrProductCategories_Category_CategoryIdAndBrandContains(long categoryId1, String name, long categoryId2, String brand, Pageable pageable);

    @Query("select p from Product p inner join ProductCategory pc on p.productId = pc.product.productId " +
            "where pc.category.categoryId= :id " +
            "and (p.name like %:name% or p.brand like %:brand%)")
    Page<Product> findAllByCategoryAndContainsNameOrBrand(@Param("id") long categoryId, @Param("name") String name, @Param("brand") String brand, Pageable pageable);
}
