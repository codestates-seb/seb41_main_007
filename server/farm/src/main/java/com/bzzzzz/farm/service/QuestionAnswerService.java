package com.bzzzzz.farm.service;

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
}
