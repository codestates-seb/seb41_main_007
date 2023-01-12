package com.bzzzzz.farm.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    NOT_LOGIN(400, "login, please"),

    REVIEW_NOT_FOUND(404, "Review not found"),
    INVALID_USER(405, "Method not allowed"),

    PRODUCT_NOT_FOUND(404, "Product not found"),
    PRODUCT_OPTION_NOT_FOUND(404, "ProductOption not found"),
    PRODUCT_CATEGORY_NOT_FOUND(404, "ProductCategory not found"),
    PRODUCT_CATEGORY_EXISTS(409, "ProductCategory exists"),

    LIKE_EXISTS(409, "Like exists"),
    LIKE_NOT_FOUND(404, "Like not found"),

    CATEGORY_EXISTS(409, "Category exists"),
    CATEGORY_NOT_FOUND(404, "Category not found"),

    CART_PRODUCT_NOT_FOUND(404, "CartProduct not found"),
    CART_NOT_FOUND(404, "Cart not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}