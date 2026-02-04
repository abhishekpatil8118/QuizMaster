package com.quiz.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserAnswersDto {

    private Long userId;
    private Long questionId;
    private Integer selectedOption;
	
}
