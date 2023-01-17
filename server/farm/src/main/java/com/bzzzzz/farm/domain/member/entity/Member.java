package com.bzzzzz.farm.domain.member.entity;

import com.bzzzzz.farm.global.audit.Auditable;
import com.bzzzzz.farm.domain.cart.entiy.Cart;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false, unique = true)
    private String phone;

    @OneToOne(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Cart cart;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String email) {
        this.email = email;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
        if (cart.getMember() != this) {
            cart.setMember(this);
        }
    }
}
