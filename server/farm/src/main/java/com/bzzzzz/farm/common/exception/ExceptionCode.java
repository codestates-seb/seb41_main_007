package com.bzzzzz.farm.common.exception;

import lombok.Getter;

public enum ExceptionCode {
    //common
    REQUEST_FORBIDDEN(403, "요청에 대한 권한이 없습니다"),

    //member
    MEMBER_NOT_FOUND(404, "존재하지 않는 회원입니다"),
    MEMBER_EXISTS(409, "이미 존재하는 회원입니다"),
    NOT_LOGIN(400, "로그인된 사용자만 접근할 수 있습니다"),
    REFRESH_TOKEN_NOT_FOUND(404, "리프레시 토큰을 찾을 수 없습니다"),

    //review
    REVIEW_NOT_FOUND(404,"Review not found"),
    INVALID_USER(405,"Method not allowed"),
    REVIEW_ANSWER_NOT_FOUND(404,"리뷰 답변을 찾을 수 없습니다"),

    //order
    CAN_NOT_ORDER_PRODUCT(400, "주문할 수 없는 제품입니다."),
    CAN_NOT_CANCEL_ORDER(400,"주문을 취소할 수 없습니다."),
    NOT_ENOUGH_STOCK(400, "재고가 충분하지 않습니다."),
    ORDER_NOT_FOUND(404, "주문을 찾을 수 없습니다"),

    //payment
    PAY_CANCEL(404,"결제가 취소되었습니다"),
    PAY_FAILED(404,"결제가 실패하였습니다"),
    CAN_NOT_PAY(400,"결제할 수 없는 상태입니다"),

    //product
    PRODUCT_NOT_FOUND(404, "Product not found"),
    PRODUCT_OPTION_NOT_FOUND(404, "ProductOption not found"),
    PRODUCT_OPTION_CONFLICT(409,"하나 이상의 옵션이 존재해야 합니다."),
    PRODUCT_CATEGORY_NOT_FOUND(404, "ProductCategory not found"),
    PRODUCT_CATEGORY_EXISTS(409, "ProductCategory exists"),
    PRODUCT_CATEGORY_CONFLICT(409, "하나 이상의 카테고리가 존재해야 합니다."),

    //like
    LIKE_EXISTS(409, "Like exists"),
    LIKE_NOT_FOUND(404, "Like not found"),

    //category
    CATEGORY_EXISTS(409, "Category exists"),
    CATEGORY_NOT_FOUND(404, "Category not found"),

    //cart
    CART_NOT_FOUND(404, "Cart not found"),

    //question
    QUESTION_NOT_FOUND(404,"질문을 찾을 수 없습니다"),
    QUESTION_ANSWER_NOT_FOUND(404,"질문 답변을 찾을 수 없습니다");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
