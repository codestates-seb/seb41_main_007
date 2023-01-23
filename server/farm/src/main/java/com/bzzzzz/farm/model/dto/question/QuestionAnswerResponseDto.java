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
public class QuestionAnswerResponseDto {
    private Long questionAnswerId;
    private Long questionId;
    private Long memberId;
    private String questionAnswerTitle;
    private String questionAnswerContent;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;

    public QuestionAnswerResponseDto(Long questionAnswerId, Long questionId, Long memberId, String questionAnswerTitle, String questionAnswerContent, LocalDateTime createdAt, LocalDateTime lastModifiedAt) {
        this.questionAnswerId = questionAnswerId;
        this.questionId = questionId;
        this.memberId = memberId;
        this.questionAnswerTitle = questionAnswerTitle;
        this.questionAnswerContent = questionAnswerContent;
        this.createdAt = createdAt;
        this.lastModifiedAt = lastModifiedAt;
    }
}
