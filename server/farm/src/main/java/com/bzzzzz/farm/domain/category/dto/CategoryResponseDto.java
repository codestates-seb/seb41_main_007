package com.bzzzzz.farm.domain.category.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CategoryResponseDto {
    private Long categoryId;
    private String name;
    private Integer sequenceNum;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
