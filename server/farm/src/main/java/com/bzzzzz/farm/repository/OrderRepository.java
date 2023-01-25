package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
