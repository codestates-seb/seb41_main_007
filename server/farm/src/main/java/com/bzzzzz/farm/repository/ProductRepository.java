package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Product;
import com.bzzzzz.farm.repository.querydsl.ProductRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
}
// Todo: soldCount,
//  * Product 엔티티에서 분리시키기 *
//  별점순 추가해보기