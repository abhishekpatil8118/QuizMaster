package com.quiz.service;

import java.util.List;

import com.quiz.dto.AttemptAdminDto;
import com.quiz.dto.QuizResultResponseDto;
import com.quiz.dto.StartAttemptRequestDto;
import com.quiz.entity.QuizAttempt;
import com.quiz.entity.UserAnswer;

public interface QuizAttemptService {

	// Start quiz
    QuizAttempt startAttempt(StartAttemptRequestDto dto);

    // Submit quiz
    QuizResultResponseDto submitQuiz(
            Long attemptId,
            List<UserAnswer> answers 
    );

//    // Admin: view all attempts
//    List<AdminAttemptResponseDto> getAllAttemptsForAdmin();
    List<AttemptAdminDto> getAllAttemptsForAdmin();
    
    List<AttemptAdminDto> getAttemptsByUser(Long userId);
    }
