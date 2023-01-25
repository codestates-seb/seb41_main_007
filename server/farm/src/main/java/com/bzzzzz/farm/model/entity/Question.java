package com.bzzzzz.farm.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String questionTitle;

    @Column(nullable = false)
    private String questionContent;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "questionAnswerId")
    private QuestionAnswer questionAnswer;

    public Question(String questionTitle, String questionContent) {
        this.questionTitle = questionTitle;
        this.questionContent = questionContent;
    }
}
