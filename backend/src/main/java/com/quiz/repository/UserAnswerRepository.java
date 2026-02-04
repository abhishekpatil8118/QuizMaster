package com.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quiz.entity.UserAnswer;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    // Custom methods for user answer-related operations
}
