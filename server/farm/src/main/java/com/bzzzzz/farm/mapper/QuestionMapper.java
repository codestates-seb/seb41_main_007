package com.bzzzzz.farm.mapper;

import com.bzzzzz.farm.model.dto.member.MemberDto;
import com.bzzzzz.farm.model.dto.question.QuestionResponseDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Question;
import com.bzzzzz.farm.model.dto.question.QuestionPostDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    default QuestionResponseDto questionToQuestionResponseDto(Question question, MemberDto.Response member) {
        MemberDto.Response response = new MemberDto.Response();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        response.setMemberId(question.getMember().getMemberId());
        response.setName(question.getMember().getName());
        response.setEmail(question.getMember().getEmail());
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(phoneNumber -> response.setPhoneNumber(phoneNumber));
        Optional.ofNullable(member.getGender())
                .ifPresent(gender -> response.setGender(gender));
        Optional.ofNullable(member.getBirth())
                .ifPresent(birth -> response.setBirth(formatter.format(birth)));

        if (question == null) {
            return null;
        } else {
            QuestionResponseDto questionResponseDto = new QuestionResponseDto(question.getQuestionId(),
                    response,
                    question.getQuestionTitle(),
                    question.getQuestionContent(),
                    question.getCreatedAt(),
                    question.getModifiedAt()
            );
            return questionResponseDto;
        }
    }

    default List<QuestionResponseDto> questionToQuestionsResponseDto(List<Question> questions){
        return questions.stream().map(question -> new QuestionResponseDto(
                question.getQuestionId(),
                MemberDto.Response.builder()
                        .memberId(question.getMember().getMemberId())
                        .name(question.getMember().getName())
                        .build(),
                question.getQuestionTitle(),
                question.getQuestionContent(),
                question.getCreatedAt(),
                question.getModifiedAt()
        )).collect(Collectors.toList());
    }

}
