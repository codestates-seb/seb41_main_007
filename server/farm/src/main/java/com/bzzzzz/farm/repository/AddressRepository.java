package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
