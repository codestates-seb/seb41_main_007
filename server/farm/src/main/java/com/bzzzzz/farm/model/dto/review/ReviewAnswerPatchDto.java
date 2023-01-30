package com.bzzzzz.farm.model.dto.review;

import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
@Validated
public class ReviewAnswerPatchDto {
    private String reviewAnswerTitle;
    private String reviewAnswerContent;
}
