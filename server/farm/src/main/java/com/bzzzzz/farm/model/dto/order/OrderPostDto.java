package com.bzzzzz.farm.model.dto.order;

import com.bzzzzz.farm.model.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;
import java.util.List;

@Getter
@Builder
public class OrderPostDto {
    @Setter
    private Long memberId;
    @NotBlank
    private String address;
    @NotBlank
    private String name;
    @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
            message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.")
    private String phone;
    @NotNull
    private List<OrderProductPostDto> orderProductPostDtos;

    // 편의 메서드
    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);
        return member;
    }
}
