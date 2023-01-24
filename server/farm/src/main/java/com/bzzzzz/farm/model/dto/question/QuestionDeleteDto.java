package com.bzzzzz.farm.model.dto.question;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class QuestionDeleteDto {
    @Positive
    private Long questionId;
}
