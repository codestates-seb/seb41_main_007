package com.bzzzzz.farm.question.service;

import com.bzzzzz.farm.question.entity.Question;
import com.bzzzzz.farm.question.repository.QuestionRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
public class QuestionService {

    private QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    //질문 글 작성
    public Question insertQuestion(Question question) {
        return questionRepository.save(question);
    }

    //특정 질문 글 불러오기
    @Transactional(readOnly = true)
    public Question getQuestion(Long questionId){
        return questionRepository.findById(questionId).orElseThrow(()-> new IllegalArgumentException("해당 질문글이 없습니다. questionId=" + questionId));
    }
}
