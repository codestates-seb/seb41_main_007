package com.bzzzzz.farm.category.entity;

import com.bzzzzz.farm.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(nullable = false)
    private Integer sequenceNum = 0;

    @Column(nullable = false, unique = true)
    private String name;

    public Category(Long categoryId) {
        this.categoryId = categoryId;
    }
}
