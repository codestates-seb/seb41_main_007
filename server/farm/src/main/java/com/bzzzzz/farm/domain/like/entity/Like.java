package com.bzzzzz.farm.domain.like.entity;

import com.bzzzzz.farm.global.audit.Auditable;
import com.bzzzzz.farm.domain.member.entity.Member;
import com.bzzzzz.farm.domain.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "LIKES")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Like extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;
}
