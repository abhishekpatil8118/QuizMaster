package com.quiz.controller;

import com.quiz.entity.Question;
import com.quiz.entity.Quiz;
import com.quiz.repository.QuizRepository;
import com.quiz.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    private final QuizService quizService;
    private final QuizRepository quizRepository;

    public QuizController(QuizService quizService, QuizRepository quizRepository) {
        this.quizService = quizService;
		this.quizRepository = quizRepository;
    }

    // ================= ADMIN =================

    // Create a quiz
    @PostMapping("/admin/create")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.createQuiz(quiz);
    }

    // ================= USER =================

    // Get all quizzes (for quiz list page)
    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    // Start quiz → fetch questions
    @GetMapping("/{quizId}/start")
    public List<Question> startQuiz(@PathVariable Long quizId) {
        return quizService.startQuiz(quizId);
    }
    
    
    @DeleteMapping("/admin/delete/{quizId}")
    public void deleteQuiz(@PathVariable Long quizId) {
        quizRepository.deleteById(quizId);
    }
}
