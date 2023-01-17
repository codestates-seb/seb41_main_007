package com.bzzzzz.farm.domain.question.entity;

import com.bzzzzz.farm.global.audit.Auditable;
import com.bzzzzz.farm.domain.member.entity.Member;
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

    public Question(String questionTitle, String questionContent) {
        this.questionTitle = questionTitle;
        this.questionContent = questionContent;
    }
}
