package com.bzzzzz.farm.global.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class IdRequestDto {
    @Positive
    private Long id;
}