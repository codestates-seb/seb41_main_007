package com.bzzzzz.farm.exception;

import lombok.Getter;

public enum ExceptionCode {
    REQUEST_FORBIDDEN(403, "요청에 대한 권한이 없습니다"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    NOT_LOGIN(400, "login, please"),

    REVIEW_NOT_FOUND(404,"Review not found"),
    REFRESH_TOKEN_NOT_FOUND(404, "Refresh token not found"),
    INVALID_USER(405,"Method not allowed"),
    REVIEW_ANSWER_NOT_FOUND(404,"Review not found"),

    CAN_NOT_ORDER_PRODUCT(400, "주문할 수 없는 제품입니다."),
    CAN_NOT_CANCEL_ORDER(400,"주문을 취소할 수 없습니다."),
    NOT_ENOUGH_STOCK(400, "재고가 충분하지 않습니다."),
    ORDER_NOT_FOUND(404, "주문을 찾을 수 없습니다"),

    PRODUCT_NOT_FOUND(404, "Product not found"),
    PRODUCT_OPTION_NOT_FOUND(404, "ProductOption not found"),
    PRODUCT_OPTION_CONFLICT(409,"하나 이상의 옵션이 존재해야 합니다."),
    PRODUCT_CATEGORY_NOT_FOUND(404, "ProductCategory not found"),
    PRODUCT_CATEGORY_EXISTS(409, "ProductCategory exists"),
    PRODUCT_CATEGORY_CONFLICT(409, "하나 이상의 카테고리가 존재해야 합니다."),

    LIKE_EXISTS(409, "Like exists"),
    LIKE_NOT_FOUND(404, "Like not found"),

    CATEGORY_EXISTS(409, "Category exists"),
    CATEGORY_NOT_FOUND(404, "Category not found"),

    CART_PRODUCT_NOT_FOUND(404, "CartProduct not found"),
    CART_NOT_FOUND(404, "Cart not found"),

    QUESTION_NOT_FOUND(404,"Question not found"),
    QUESTION_ANSWER_NOT_FOUND(404,"Question answer not found"),
    PAY_CANCEL(404,"결제취소"),
    PAY_FAILED(404,"결제실패");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
