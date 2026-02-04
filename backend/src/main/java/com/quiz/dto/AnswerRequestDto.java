package com.quiz.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerRequestDto {
	private Long questionId;
    private String selectedAnswer;
}
