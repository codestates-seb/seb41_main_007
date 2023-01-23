package com.bzzzzz.farm.controller;


import com.bzzzzz.farm.mapper.QuestionAnswerMapper;
import com.bzzzzz.farm.model.dto.MultiResponseDto;
import com.bzzzzz.farm.model.dto.question.*;
import com.bzzzzz.farm.model.entity.Member;
import com.bzzzzz.farm.model.entity.Question;
import com.bzzzzz.farm.mapper.QuestionMapper;
import com.bzzzzz.farm.model.entity.QuestionAnswer;
import com.bzzzzz.farm.service.MemberService;
import com.bzzzzz.farm.service.QuestionAnswerService;
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

    private final QuestionAnswerMapper questionAnswerMapper;
    private final QuestionAnswerService questionAnswerService;
    public QuestionController(QuestionService questionService, QuestionMapper questionMapper, MemberService memberService, QuestionAnswerMapper questionAnswerMapper, QuestionAnswerService questionAnswerService) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.memberService = memberService;
        this.questionAnswerMapper = questionAnswerMapper;
        this.questionAnswerService = questionAnswerService;
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

    //특정 문의 수정
    @PatchMapping
    public ResponseEntity patchQuestion(@RequestBody @Valid QuestionPostDto questionPatchDto){
        Question question = questionMapper.questionPostDtoToQuestion(questionPatchDto);
        Member member = memberService.getLoginMember();

        Question updatedQuestion = questionService.updateQuestion(question,member);

        QuestionResponseDto questionResponseDto = questionMapper.questionToQuestionResponseDto(updatedQuestion);
        return new ResponseEntity(questionResponseDto, HttpStatus.OK);
    }



    //특정 문의 삭제
    @DeleteMapping({""})
    public ResponseEntity deleteQuestion(@RequestBody @Valid QuestionDeleteDto questionDeleteDto){
        Member member = memberService.getLoginMember();

        questionService.deleteQuestion(questionDeleteDto.getQuestionId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/answers")
    public ResponseEntity insertQuestionAnswer(@RequestBody @Valid QuestionAnswerPostDto questionAnswerPostDto){
        Member member = memberService.getLoginMember();
        if(member.getRoles().equals("ROLE_ADMIN")){
            QuestionAnswer questionAnswer = questionAnswerMapper.questionAnswerPostDtoToQuestionAnswer(questionAnswerPostDto);
            questionAnswer.setMember(member);
            QuestionAnswer insertedQuestionAnswer = questionAnswerService.insertQuestionAnswer(questionAnswer);
            QuestionAnswerResponseDto questionAnswerResponseDto = questionAnswerMapper.questionAnswerToQuestionAnswerResponseDto(insertedQuestionAnswer);
            return new ResponseEntity<>(questionAnswerResponseDto,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
