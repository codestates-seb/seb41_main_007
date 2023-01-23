package com.bzzzzz.farm.model.dto.question;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;

@Validated
@Getter
@Setter
@NoArgsConstructor
public class QuestionResponseDto {
    private Long questionId;
    private Long memberId;
    private String questionTitle;
    private String questionContent;
    private String createdAt;
    private String lastModifiedAt;

    public QuestionResponseDto(Long questionId, Long memberId, String questionTitle, String questionContent, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.questionId = questionId;
        this.memberId = memberId;
        this.questionTitle = questionTitle;
        this.questionContent = questionContent;
        this.createdAt = createdAt.toString();
        this.lastModifiedAt = modifiedAt.toString();
    }

}
