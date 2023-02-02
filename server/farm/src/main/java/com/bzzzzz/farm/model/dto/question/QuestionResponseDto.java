package com.bzzzzz.farm.model.dto.question;

import com.bzzzzz.farm.model.dto.member.MemberDto;
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
    private MemberDto.Response member;
    private String questionTitle;
    private String questionContent;
    private String createdAt;
    private String lastModifiedAt;

    public QuestionResponseDto(Long questionId, MemberDto.Response member, String questionTitle, String questionContent, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.questionId = questionId;
        this.member = member;
        this.questionTitle = questionTitle;
        this.questionContent = questionContent;
        this.createdAt = createdAt.toString();
        this.lastModifiedAt = modifiedAt.toString();
    }

}
