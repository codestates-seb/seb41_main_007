package com.bzzzzz.farm.model.dto.question;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
@Validated
public class QuestionPostDto {
    private String questionTitle;
    private String questionContent;
}
