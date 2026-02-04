package com.quiz.dto;

import java.time.LocalDateTime;




public record AttemptAdminDto(
	    Long id,
	    String username,
	    String quizTitle,
	    Integer score,
	    Integer totalQuestions,
	    LocalDateTime submittedAt
	) {}

