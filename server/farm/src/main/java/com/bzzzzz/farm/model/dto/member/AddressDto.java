package com.bzzzzz.farm.model.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Pattern;

public class AddressDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private String addressName;

        private String name;

        private String detailAddress;

        @Pattern(regexp = "^010\\d{3,4}\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자로 구성되어야 합니다.")
        private String phoneNumber;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{

        private Long addressId;

        private String addressName;

        private String name;

        private String detailAddress;

        @Pattern(regexp = "^010\\d{3,4}\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자로 구성되어야 합니다.")
        private String phoneNumber;

        public void setAddressId(long addressId){
            this.addressId = addressId;
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response{
        private Long addressId;

        private String addressName;

        private String name;

        private String detailAddress;

        private String phoneNumber;
    }
}
