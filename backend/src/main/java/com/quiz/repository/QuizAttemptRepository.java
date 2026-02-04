package com.quiz.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quiz.dto.AttemptAdminDto;
import com.quiz.entity.QuizAttempt;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    List<QuizAttempt> findByUser_Id(Long userId);

    List<QuizAttempt> findByQuiz_Id(Long quizId);
    
   // List<AdminAttemptResponseDto> getAllAttemptsForAdmin();
    Optional<QuizAttempt> 
    findTopByUserIdAndQuizIdAndSubmittedAtIsNullOrderByIdDesc(
            Long userId, Long quizId);

    @Query("""
    		SELECT new com.quiz.dto.AttemptAdminDto(
    		  a.id,
    		  u.username,
    		  q.title,
    		  a.score,
    		  q.totalQuestions,
    		  a.submittedAt
    		)
    		FROM QuizAttempt a
    		JOIN a.user u
    		JOIN a.quiz q
    		""")
    		List<AttemptAdminDto> findAllForAdmin();
    
    // ✅ USER – ONLY HIS ATTEMPTS
    @Query("""
        SELECT new com.quiz.dto.AttemptAdminDto(
            a.id,
            u.username,
            q.title,
            a.score,
            q.totalQuestions,
            a.submittedAt
        )
        FROM QuizAttempt a
        JOIN a.user u
        JOIN a.quiz q
        WHERE u.id = :userId
        ORDER BY a.submittedAt DESC
    """)
    List<AttemptAdminDto> findAttemptsByUserId(@Param("userId") Long userId);


}

