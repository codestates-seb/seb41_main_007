package com.bzzzzz.farm.model.dto.like;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LikeRequestDto {
    @Setter
    private Long memberId;
    private Long productId;
}
