package com.bzzzzz.farm.model.dto.category;

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
