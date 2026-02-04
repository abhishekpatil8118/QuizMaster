package com.quiz.service;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.quiz.entity.Question;
import com.quiz.entity.Quiz;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizRepository;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizService(QuizRepository quizRepository,
                       QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

 // ADMIN: create quiz
    public Quiz createQuiz(Quiz quiz) {

        int totalAvailable =
                questionRepository.countByTechnology(quiz.getTechnology());

        if (totalAvailable == 0) {
            throw new RuntimeException(
                "No questions available for technology: " + quiz.getTechnology()
            );
        }

        // 🔴 VALIDATION
        if (quiz.getTotalQuestions() <= 0) {
            quiz.setTotalQuestions(totalAvailable);
        } 
        else if (quiz.getTotalQuestions() > totalAvailable) {
            throw new RuntimeException(
                "Number of quiz questions (" + quiz.getTotalQuestions() +
                ") cannot be greater than available questions (" + totalAvailable + ")"
            );
        }

        return quizRepository.save(quiz);
    }


    // USER: get all quizzes
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // USER: start quiz → fetch random questions
    public List<Question> startQuiz(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<Question> questions =
                questionRepository.findByTechnology(quiz.getTechnology());

        if (questions.isEmpty()) {
            throw new RuntimeException("No questions available");
        }

        Collections.shuffle(questions);

        int limit = Math.min(quiz.getTotalQuestions(), questions.size());

        return questions.subList(0, limit);
    }

}
