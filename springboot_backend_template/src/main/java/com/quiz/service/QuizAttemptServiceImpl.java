package com.quiz.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.quiz.dto.AttemptAdminDto;
import com.quiz.dto.QuizResultResponseDto;
import com.quiz.dto.StartAttemptRequestDto;
import com.quiz.entity.Question;
import com.quiz.entity.Quiz;
import com.quiz.entity.QuizAttempt;
import com.quiz.entity.User;
import com.quiz.entity.UserAnswer;
import com.quiz.repository.QuestionRepository;
import com.quiz.repository.QuizAttemptRepository;
import com.quiz.repository.QuizRepository;
import com.quiz.repository.UserRepository;

@Service
public class QuizAttemptServiceImpl implements QuizAttemptService {

    private final QuizAttemptRepository quizAttemptRepository;
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    

    public QuizAttemptServiceImpl(
            QuizAttemptRepository quizAttemptRepository,
            UserRepository userRepository,
            QuizRepository quizRepository,
            QuestionRepository questionRepository) {

        this.quizAttemptRepository = quizAttemptRepository;
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }
    
    @Override
    public QuizResultResponseDto submitQuiz(
            Long attemptId,
            List<UserAnswer> answers) {

        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        // 🔒 Prevent second submission
        if (attempt.getSubmittedAt() != null) {
            throw new RuntimeException("Quiz already submitted");
        }

        int score = 0;

        for (UserAnswer ans : answers) {

            Question question = questionRepository
                    .findById(ans.getQuestion().getId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            if (question.getCorrectAnswer()
                    .equalsIgnoreCase(ans.getSelectedOption())) {
                score++;
            }
        }

        // ✅ FINALIZE ATTEMPT
        attempt.setScore(score);
        attempt.setSubmittedAt(LocalDateTime.now());

        quizAttemptRepository.save(attempt); // UPDATE

        return new QuizResultResponseDto(
                attempt.getId(),
                score,
                answers.size()
        );
    }





    // START QUIZ
    @Override
    public QuizAttempt startAttempt(StartAttemptRequestDto dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Quiz quiz = quizRepository.findById(dto.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        return quizAttemptRepository
            .findTopByUserIdAndQuizIdAndSubmittedAtIsNullOrderByIdDesc(
                    user.getId(), quiz.getId())
            .orElseGet(() -> {
                QuizAttempt attempt = new QuizAttempt();
                attempt.setUser(user);
                attempt.setQuiz(quiz);   // quiz is MANAGED here
                return quizAttemptRepository.save(attempt);
            });
    }

    public List<AttemptAdminDto> getAllAttemptsForAdmin() {
        return quizAttemptRepository.findAllForAdmin();
    }

    @Override
    public List<AttemptAdminDto> getAttemptsByUser(Long userId) {
        return quizAttemptRepository.findAttemptsByUserId(userId);
    }

}
