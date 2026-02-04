package com.quiz.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAttemptResponseDto {

    private Long id;
    private String username;
    private String quizTitle;
    private int score;
    private int totalQuestions;
    private LocalDateTime submittedAt;

    public AdminAttemptResponseDto(Long id,
                                   String username,
                                   String quizTitle,
                                   int score,
                                   int totalQuestions,
                                   LocalDateTime submittedAt) {
        this.id = id;
        this.username = username;
        this.quizTitle = quizTitle;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.submittedAt = submittedAt;
    }
}
