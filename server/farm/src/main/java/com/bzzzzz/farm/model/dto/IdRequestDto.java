package com.bzzzzz.farm.model.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class IdRequestDto {
    @Positive
    private Long id;
}