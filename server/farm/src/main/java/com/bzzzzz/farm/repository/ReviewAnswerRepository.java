package com.bzzzzz.farm.repository;


import com.bzzzzz.farm.model.entity.ReviewAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewAnswerRepository extends JpaRepository<ReviewAnswer, Long> {


}
