package com.quiz.dto;

public class QuizResultResponseDto {

    private Long quizAttemptId;
    private Integer score;
    private Integer totalQuestions;

    // REQUIRED by Jackson
    public QuizResultResponseDto() {
    }

    // Constructor used in service
    public QuizResultResponseDto(Long quizAttemptId, Integer score, Integer totalQuestions) {
        this.quizAttemptId = quizAttemptId;
        this.score = score;
        this.totalQuestions = totalQuestions;
    }

    // REQUIRED getters (Jackson uses these)
    public Long getQuizAttemptId() {
        return quizAttemptId;
    }

    public Integer getScore() {
        return score;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }
}
