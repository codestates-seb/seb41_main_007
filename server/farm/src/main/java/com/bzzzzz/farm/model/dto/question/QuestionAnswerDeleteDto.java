package com.bzzzzz.farm.model.dto.question;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class QuestionAnswerDeleteDto {
    @Positive
    private Long questionAnswerId;
}
