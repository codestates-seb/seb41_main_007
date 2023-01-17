package com.bzzzzz.farm.global.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class IdRequestDto {
    @Positive
    private Long id;
}