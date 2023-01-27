package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Order;
import com.bzzzzz.farm.model.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrder(Order order);
}
