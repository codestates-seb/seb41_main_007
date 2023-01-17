package com.bzzzzz.farm.question.mapper;

import com.bzzzzz.farm.question.dto.QuestionPostDto;
import com.bzzzzz.farm.question.dto.QuestionResponseDto;
import com.bzzzzz.farm.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    default Question questionPostDtoToQuestion(QuestionPostDto questionPostDto) {
        if (questionPostDto == null) {
            return null;
        } else {
            Question question = new Question(questionPostDto.getQuestionTitle(), questionPostDto.getQuestionContent());
            return question;
        }
    }

    default QuestionResponseDto questionToQuestionResponseDto(Question question) {
        if (question == null) {
            return null;
        } else {
            QuestionResponseDto questionResponseDto = new QuestionResponseDto(question.getQuestionId(),
                    question.getQuestionTitle(),
                    question.getQuestionContent(),
                    question.getCreatedAt(),
                    question.getModifiedAt()
            );
            return questionResponseDto;
        }
    }

}
