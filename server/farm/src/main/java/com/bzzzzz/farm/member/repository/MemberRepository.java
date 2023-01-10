package com.bzzzzz.farm.member.repository;

import com.bzzzzz.farm.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Member findMemberByMemberId(Long memberId);
}
