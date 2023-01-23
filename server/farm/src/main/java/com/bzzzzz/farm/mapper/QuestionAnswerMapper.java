package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.question.QuestionAnswerPostDto;
import com.bzzzzz.farm.model.dto.question.QuestionAnswerResponseDto;
import com.bzzzzz.farm.model.entity.QuestionAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionAnswerMapper {

    default QuestionAnswer questionAnswerPostDtoToQuestionAnswer(QuestionAnswerPostDto questionAnswerPostDto){
        if(questionAnswerPostDto==null){
            return null;
        }else{
            QuestionAnswer questionAnswer = new QuestionAnswer(
                    questionAnswerPostDto.getQuestionAnswerTitle(),
                    questionAnswerPostDto.getQuestionAnswerContent()
            );
            return questionAnswer;
        }
    }
    default QuestionAnswerResponseDto questionAnswerToQuestionAnswerResponseDto(QuestionAnswer questionAnswer){
        return questionAnswer == null ? null: new QuestionAnswerResponseDto(
                questionAnswer.getQuestionAnswerId(),
                questionAnswer.getQuestion().getQuestionId(),
                questionAnswer.getMember().getMemberId(),
                questionAnswer.getQuestionAnswerTitle(),
                questionAnswer.getQuestionAnswerContent(),
                questionAnswer.getCreatedAt(),
                questionAnswer.getModifiedAt()

        );
    }
}
