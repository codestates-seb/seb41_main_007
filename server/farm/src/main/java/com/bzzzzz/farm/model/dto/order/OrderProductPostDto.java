package com.bzzzzz.farm.model.dto.order;

import com.bzzzzz.farm.model.entity.ProductOption;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class OrderProductPostDto {
    @Positive
    private Long productOptionId;
    @Positive
    private Integer quantity;

    private ProductOption productOption;
}
