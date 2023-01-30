package com.bzzzzz.farm.repository;

import com.bzzzzz.farm.model.entity.Address;
import com.bzzzzz.farm.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByMember(Member member);
}
