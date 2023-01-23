package com.bzzzzz.farm.controller;


import com.bzzzzz.farm.model.dto.MultiResponseDto;
import com.bzzzzz.farm.model.dto.question.QuestionDeleteDto;
import com.bzzzzz.farm.model.dto.question.QuestionPostDto;
import com.bzzzzz.farm.model.dto.question.QuestionResponseDto;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Question;
import com.bzzzzz.farm.mapper.QuestionMapper;
import com.bzzzzz.farm.service.MemberService;
import com.bzzzzz.farm.service.QuestionService;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@Log4j2
@RestController
@RequestMapping({"/questions"})
@Transactional
@Validated
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    private final MemberService memberService;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper, MemberService memberService) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.memberService = memberService;
    }

    //문의등록
    @PostMapping({""})
    public ResponseEntity insertQuestion(@RequestBody @Valid QuestionPostDto questionPostDto) {
        Question question = questionMapper.questionPostDtoToQuestion(questionPostDto);
        Question insertQuestion = questionService.insertQuestion(question);

        QuestionResponseDto questionResponseDto = questionMapper.questionToQuestionResponseDto(insertQuestion);


        return new ResponseEntity(questionResponseDto, HttpStatus.OK);
    }

    //특정 문의 불러오기
    @GetMapping({"/{questionId}"})
    public ResponseEntity getQuestion(@PathVariable("questionId") Long questionId) {
        Question question = questionService.getQuestion(questionId);
        QuestionResponseDto questionResponseDto = questionMapper.questionToQuestionResponseDto(question);

        return new ResponseEntity(questionResponseDto, HttpStatus.OK);
    }

    //전체 문의 불러오기
    @GetMapping({""})
    public ResponseEntity getAllQuestions(@RequestParam(required = false, defaultValue = "1") int page,
                                          @RequestParam(required = false, defaultValue = "10") int size) {
        Page<Question> questionPage = questionService.findQuestions(page - 1, size);

        return new ResponseEntity(
                new MultiResponseDto<>(questionMapper.questionToQuestionsResponseDto(questionPage.getContent()), questionPage),
                HttpStatus.OK
        );
    }

    @DeleteMapping({""})
    public ResponseEntity deleteQuestion(@RequestBody @Valid QuestionDeleteDto questionDeleteDto){
        Member member = memberService.getLoginMember();

        questionService.deleteQuestion(questionDeleteDto.getQuestionId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}
