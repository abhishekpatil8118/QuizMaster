package com.quiz.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.dto.AnswerRequestDto;
import com.quiz.dto.AttemptAdminDto;
import com.quiz.dto.QuizResultResponseDto;
import com.quiz.dto.StartAttemptRequestDto;
import com.quiz.entity.Question;
import com.quiz.entity.Quiz;
import com.quiz.entity.QuizAttempt;
import com.quiz.entity.UserAnswer;
import com.quiz.repository.QuizRepository;
import com.quiz.service.QuestionService;
import com.quiz.service.QuizAttemptService;

@RestController
@RequestMapping("/attempt")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;
    private final QuestionService questionService;
    private final QuizRepository quizRepository;
    
    public QuizAttemptController(
            QuizAttemptService quizAttemptService,
            QuestionService questionService, QuizRepository quizRepository) {
        this.quizAttemptService = quizAttemptService;
        this.questionService = questionService;
		this.quizRepository = quizRepository;
		
    }

    // START QUIZ
//    @PostMapping("/start")
//    public Map<String, Object> startAttempt(
//            @RequestBody StartAttemptRequestDto dto) {
//
//        var attempt = quizAttemptService.startAttempt(dto);
//        
//        System.out.println("Attempt id:  ------------"+attempt.getId());
//        
//        List<Question> questions =
//                questionService.getAllQuestions();
//        
//        
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("attemptId", attempt.getId());
//        response.put("questions", questions);
//
//        return response;
//    }

    
    @PostMapping("/start")
    public Map<String, Object> startAttempt(
            @RequestBody StartAttemptRequestDto dto) {

        QuizAttempt attempt = quizAttemptService.startAttempt(dto);

        List<Question> questions =
                questionService.getQuestionsByQuizId(dto.getQuizId());

        // 🔥 FETCH QUIZ AGAIN (SAFE)
        Quiz quiz = quizRepository.findById(dto.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        Map<String, Object> response = new HashMap<>();
        response.put("attemptId", attempt.getId());
        response.put("questions", questions);
        response.put("duration", quiz.getDuration()); // ✅ SAFE

        return response;
    }

    
    
    // SUBMIT QUIZ
    @PostMapping("/{attemptId}/submit")
    public QuizResultResponseDto submitQuiz(
            @PathVariable Long attemptId,
            @RequestBody List<AnswerRequestDto> answers) {

        List<UserAnswer> userAnswers = new ArrayList<>();

        for (AnswerRequestDto dto : answers) {
            UserAnswer ua = new UserAnswer();

            Question question = new Question();
            question.setId(dto.getQuestionId());

            ua.setQuestion(question);
            ua.setSelectedOption(dto.getSelectedAnswer());

            userAnswers.add(ua);
        }

        return quizAttemptService.submitQuiz(attemptId, userAnswers);
    }
    
    @GetMapping("/all")
    public List<AttemptAdminDto> getAllAttempts() {
        return quizAttemptService.getAllAttemptsForAdmin();
    }
    
    @GetMapping("/my/{userId}")
    public List<AttemptAdminDto> getMyAttempts(@PathVariable Long userId) {
        return quizAttemptService.getAttemptsByUser(userId);
    }



}
