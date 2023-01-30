package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Question;
import com.bzzzzz.farm.model.entity.QuestionAnswer;
import com.bzzzzz.farm.repository.QuestionAnswerRepository;
import com.bzzzzz.farm.repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionAnswerService {
    private QuestionAnswerRepository questionAnswerRepository;
    private QuestionService questionService;
    private QuestionRepository questionRepository;

    public QuestionAnswer insertQuestionAnswer(QuestionAnswer questionAnswer, Long memberId) {
        Member member = new Member();
        member.setMemberId(memberId);
        questionAnswer.setMember(member);
        QuestionAnswer saveQuestionAnswer = questionAnswerRepository.save(questionAnswer);
        Question question = questionService.getQuestion(questionAnswer.getQuestion().getQuestionId());
        question.setQuestionAnswer(saveQuestionAnswer);
        questionRepository.save(question);
        return saveQuestionAnswer;
    }

    public QuestionAnswer updateQuestionAnswer(QuestionAnswer questionAnswer){
        return questionAnswerRepository.save(questionAnswer);
    }

    public void deleteQuestionAnswer(Long questionAnswerId){
        QuestionAnswer findQuestionAnswer = findVerifiedQuestionAnswer(questionAnswerId);
        questionAnswerRepository.delete(findQuestionAnswer);
    }

    private QuestionAnswer findVerifiedQuestionAnswer(Long questionAnswerId){
        return questionAnswerRepository.findById(questionAnswerId)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.QUESTION_ANSWER_NOT_FOUND));
    }
}
