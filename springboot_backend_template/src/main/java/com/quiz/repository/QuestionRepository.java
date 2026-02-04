package com.quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.quiz.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    
    List<Question> findByTechnology(String technology);

    int countByTechnology(String technology);

    @Query(value = """
            SELECT q.*
            FROM questions q
            JOIN quizzes qu ON q.technology = qu.technology
            WHERE qu.id = :quizId
            """, nativeQuery = true)
        List<Question> findQuestionsByQuizId(@Param("quizId") Long quizId);
    
    

}
