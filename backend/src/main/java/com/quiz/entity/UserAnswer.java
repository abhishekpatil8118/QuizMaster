package com.quiz.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_answers")
@Setter
@Getter
@NoArgsConstructor
public class UserAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // belongs to which quiz attempt
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_attempt_id", nullable = false)
    private QuizAttempt quizAttempt;

    // question answered
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(nullable = false)
    private String selectedOption;

    private Boolean correct;

	public UserAnswer(QuizAttempt quizAttempt, Question question, String selectedOption, Boolean correct) {
		super();
		this.quizAttempt = quizAttempt;
		this.question = question;
		this.selectedOption = selectedOption;
		this.correct = correct;
	}
    
    

}