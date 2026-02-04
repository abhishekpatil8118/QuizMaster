package com.quiz.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.quiz.entity.Question;
import com.quiz.repository.QuestionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public Question updateQuestion(Long id, Question question) {
        Question existing = getQuestionById(id);
        existing.setQuestionText(question.getQuestionText());
        existing.setOptionA(question.getOptionA());
        existing.setOptionB(question.getOptionB());
        existing.setOptionC(question.getOptionC());
        existing.setOptionD(question.getOptionD());
        existing.setCorrectAnswer(question.getCorrectAnswer());
        existing.setTechnology(question.getTechnology());
        return questionRepository.save(existing);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
    
    public List<Question> getQuestionsByQuizId(Long quizId) {
        return questionRepository.findQuestionsByQuizId(quizId);
    }
    
}
