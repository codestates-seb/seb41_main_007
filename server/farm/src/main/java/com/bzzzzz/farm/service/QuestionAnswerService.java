package com.bzzzzz.farm.service;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.QuestionAnswer;
import com.bzzzzz.farm.repository.QuestionAnswerRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionAnswerService {
    private QuestionAnswerRepository questionAnswerRepository;

    public QuestionAnswer insertQuestionAnswer(QuestionAnswer questionAnswer){
        QuestionAnswer saveQuestionAnswer = questionAnswerRepository.save(questionAnswer);
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
