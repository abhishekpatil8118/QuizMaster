package com.quiz.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "quizzes")
@Getter
@Setter
@NoArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String technology;

    @Column(nullable = false)
    private int totalQuestions;

    @Column(nullable = false)
    private int duration; // minutes

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<QuizAttempt> quizAttempts;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

	public Quiz(String title, String technology, int totalQuestions, int duration, LocalDateTime createdAt,
			List<QuizAttempt> quizAttempts) {
		super();
		this.title = title;
		this.technology = technology;
		this.totalQuestions = totalQuestions;
		this.duration = duration;
		this.createdAt = createdAt;
		this.quizAttempts = quizAttempts;
	}

    // getters & setters
}