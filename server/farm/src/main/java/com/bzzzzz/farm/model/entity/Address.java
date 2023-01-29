package com.bzzzzz.farm.model.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Address {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String addressName;

    private String name;

    private String detailAddress;

    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
