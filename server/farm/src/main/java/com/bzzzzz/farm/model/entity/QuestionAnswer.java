package com.bzzzzz.farm.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionAnswer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionAnswerId;

    @OneToOne
    @JoinColumn(name = "questionId", nullable = false)
    private Question question;

    @Column(nullable = false)
    private String questionAnswerTitle;

    @Column(nullable = false)
    private String questionAnswerContent;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;


    public QuestionAnswer(String questionAnswerTitle, String questionAnswerContent) {
        this.questionAnswerTitle = questionAnswerTitle;
        this.questionAnswerContent = questionAnswerContent;
    }
}
