package com.bzzzzz.farm.review.entity;

import com.bzzzzz.farm.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ReviewAnswer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewAnswerId;

    @Column(nullable = false)
    private String reviewAnswerTitle;

    @Column(nullable = false)
    private String reviewAnswerContent;


}
