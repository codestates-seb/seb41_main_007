package com.bzzzzz.farm.model.dto.like;

import lombok.Getter;
import lombok.Setter;

@Getter
public class LikeRequestDto {
    @Setter
    private Long memberId;
    private Long productId;
}
