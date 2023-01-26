package com.bzzzzz.farm.model.dto.order;

import com.bzzzzz.farm.model.entity.Order;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class OrderPatchDto {
    @NotNull
    @Positive
    private Long orderId;
    private Order.PaymentMethod paymentMethod;
    private Order.PaymentStatus paymentStatus;
}
