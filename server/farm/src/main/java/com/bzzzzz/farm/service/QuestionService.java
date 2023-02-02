package com.bzzzzz.farm.service;

import com.bzzzzz.farm.common.exception.BusinessLogicException;
import com.bzzzzz.farm.common.exception.ExceptionCode;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Question;
import com.bzzzzz.farm.repository.MemberRepository;
import com.bzzzzz.farm.repository.QuestionRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Log4j2
@Service
public class QuestionService {

    private QuestionRepository questionRepository;
    private MemberService memberService;
    private MemberRepository memberRepository;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService, MemberRepository memberRepository) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    //질문 글 작성
    public Question insertQuestion(Question question, Long userId) {
        Member member = memberService.findVerifiedMember(userId);
        question.setMember(member);
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
    public Question updateQuestion(Question question){
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        findQuestion.setQuestionTitle(question.getQuestionTitle());
        findQuestion.setQuestionContent(question.getQuestionContent());

        return questionRepository.save(findQuestion);
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(page, size, Sort.by("questionId").descending());
    }

    private Question findVerifiedQuestion(Long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(()-> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return question;
    }
}
