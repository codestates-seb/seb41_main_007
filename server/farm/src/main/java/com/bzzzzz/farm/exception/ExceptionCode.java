package com.bzzzzz.farm.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    NOT_LOGIN(400,"login, please"),

    REVIEW_NOT_FOUND(404,"Review not found"),
    REFRESH_TOKEN_NOT_FOUND(404, "Refresh token not found"),
    INVALID_USER(405,"Method not allowed");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
