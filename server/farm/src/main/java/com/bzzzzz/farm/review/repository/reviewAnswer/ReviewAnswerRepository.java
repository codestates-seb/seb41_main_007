package com.bzzzzz.farm.review.repository.reviewAnswer;


import com.bzzzzz.farm.review.entity.reviewanswer.ReviewAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewAnswerRepository extends JpaRepository<ReviewAnswer, Long> {

}
