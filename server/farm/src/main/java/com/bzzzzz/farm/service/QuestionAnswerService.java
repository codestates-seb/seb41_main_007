package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Question;
import com.bzzzzz.farm.model.entity.QuestionAnswer;
import com.bzzzzz.farm.model.entity.ReviewAnswer;
import com.bzzzzz.farm.repository.QuestionAnswerRepository;
import com.bzzzzz.farm.repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionAnswerService {
    public QuestionAnswerService(QuestionAnswerRepository questionAnswerRepository, QuestionRepository questionRepository) {
        this.questionAnswerRepository = questionAnswerRepository;
        this.questionRepository = questionRepository;
    }

    private QuestionAnswerRepository questionAnswerRepository;
    private QuestionService questionService;
    private QuestionRepository questionRepository;

    public QuestionAnswer insertQuestionAnswer(QuestionAnswer questionAnswer, Long memberId) {
        Member member = new Member();
        member.setMemberId(memberId);
        questionAnswer.setMember(member);
        QuestionAnswer saveQuestionAnswer = questionAnswerRepository.save(questionAnswer);
        Question question = questionRepository.findById(questionAnswer.getQuestion().getQuestionId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        question.setQuestionAnswer(saveQuestionAnswer);
        questionRepository.save(question);
        return saveQuestionAnswer;
    }

    public QuestionAnswer updateQuestionAnswer(QuestionAnswer questionAnswer, Long questionAnswerId) {
        QuestionAnswer findQuestionAnswer = findVerifiedQuestionAnswer(questionAnswerId);
        findQuestionAnswer.setQuestionAnswerTitle(questionAnswer.getQuestionAnswerTitle());
        findQuestionAnswer.setQuestionAnswerContent(questionAnswer.getQuestionAnswerContent());
        QuestionAnswer saveQuestionAnswer =questionAnswerRepository.save(findQuestionAnswer);
        return saveQuestionAnswer;
    }

    public void deleteQuestionAnswer(Long questionAnswerId){
        QuestionAnswer findQuestionAnswer = findVerifiedQuestionAnswer(questionAnswerId);
        Question findQuestion = questionRepository.findById(findQuestionAnswer.getQuestion().getQuestionId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        findQuestion.setQuestionAnswer(null);
        questionRepository.save(findQuestion);
    }

    private QuestionAnswer findVerifiedQuestionAnswer(Long questionAnswerId){
        return questionAnswerRepository.findById(questionAnswerId)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.QUESTION_ANSWER_NOT_FOUND));
    }
}
