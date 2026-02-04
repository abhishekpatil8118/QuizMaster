package com.quiz.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StartAttemptRequestDto {

    private Long userId;
    private Long quizId;
}
