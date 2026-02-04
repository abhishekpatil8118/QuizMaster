package com.quiz.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizSubmissionRequestDto {

    private Long quizId;
    private Long userId;
    private List<AnswerRequestDto> answers;
}