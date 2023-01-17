package com.bzzzzz.farm.domain.like.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class LikeRequestDto {
    @Setter
    private Long memberId;
    private Long productId;
}
