package com.bzzzzz.farm.model.dto.member;

import com.bzzzzz.farm.model.entity.Address;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.List;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post{

        private String name;

        private Date birth;

        @Email
        private String email;

        private String gender;

        @Pattern(regexp = "^010\\d{3,4}\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자로 구성되어야 합니다.")
        private String phoneNumber;

    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Patch{
        private Long memberId;
        private String password;
        private String name;
        private String birth;
        @Pattern(regexp = "^010\\d{3,4}\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자로 구성되어야 합니다.")
        private String phoneNumber;

        @Email
        private String email;

        private String gender;

        public void setMemberId(long memberId){
            this.memberId = memberId;
        }
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response{
        private Long memberId;
        private String name;
        private String birth;
        private String email;
        private String gender;
        private String phoneNumber;
    }
}
