package com.bzzzzz.farm.service;

import com.bzzzzz.farm.exception.BusinessLogicException;
import com.bzzzzz.farm.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Question;
import com.bzzzzz.farm.model.entity.Review;
import com.bzzzzz.farm.repository.QuestionRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
    public Question getQuestion(Long questionId) {
        return questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("해당 질문글이 없습니다. questionId=" + questionId));
    }

    //질문 글들 불러오기
    @Transactional(readOnly = true)
    public Page<Question> findQuestions(int page, int size) {
        Pageable pageable = createPageable(page,size);

        return questionRepository.findAll(pageable);
    }

    public void deleteQuestion(Long questionId){
        Question question = findVerifiedQuestion(questionId);
        questionRepository.delete(question);
    }

    //질문 글 수정
    public Question updateQuestion(Question question, Member member){
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        //글 작성 유저와 현재 로그인된 유저가 같은지 검증
        if(!findQuestion.getMember().getEmail().equals(member.getEmail())){
            throw new BusinessLogicException(ExceptionCode.INVALID_USER);
        }
        findQuestion.setQuestionTitle(question.getQuestionTitle());
        findQuestion.setQuestionContent(question.getQuestionContent());

        return questionRepository.save(findQuestion);
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(page, size);
    }

    private Question findVerifiedQuestion(Long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(()-> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return question;
    }
}
