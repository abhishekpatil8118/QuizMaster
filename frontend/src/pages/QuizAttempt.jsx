import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { startAttempt, submitAttempt } from "../api/attemptApi";

function QuizAttempt() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizDuration, setQuizDuration] = useState(0);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const startedRef = useRef(false);
  const timerRef = useRef(null);
  const hasSubmittedRef = useRef(false);

  /* ---------------- START QUIZ ---------------- */
  const startQuiz = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/login");
        return;
      }

      const res = await startAttempt(user.id, quizId);
      localStorage.setItem("attemptId", res.attemptId);

      const timeLimit = res.duration;
      setQuizDuration(timeLimit);

      const totalSeconds = timeLimit * 60;
      let remaining = totalSeconds;

      const savedEnd = localStorage.getItem(`quizEndTime_${res.attemptId}`);
      if (savedEnd) {
        const now = Math.floor(Date.now() / 1000);
        remaining = Math.max(0, savedEnd - now);
        if (remaining <= 0) {
          autoSubmit(res.attemptId);
          return;
        }
      } else {
        const endTime = Math.floor(Date.now() / 1000) + totalSeconds;
        localStorage.setItem(`quizEndTime_${res.attemptId}`, endTime);
      }

      setTimeLeft(remaining);

      const mapped = res.questions.map(q => ({
        id: q.id,
        questionText: q.questionText,
        options: [q.optionA, q.optionB, q.optionC, q.optionD]
      }));

      setQuestions(mapped);
    } catch {
      alert("Failed to start quiz");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startQuiz();
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [quizId]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || autoSubmitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          autoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, autoSubmitted]);

  /* ---------------- AUTO SUBMIT ---------------- */
  const autoSubmit = async (forcedAttemptId) => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setAutoSubmitted(true);

    try {
      const attemptId = forcedAttemptId || localStorage.getItem("attemptId");
      const formatted = Object.keys(answers).map(qId => ({
        questionId: Number(qId),
        selectedAnswer: answers[qId]
      }));

      const result = await submitAttempt(attemptId, formatted);
      localStorage.removeItem(`quizEndTime_${attemptId}`);

      navigate("/result", {
        state: { ...result, autoSubmitted: true }
      });
    } catch {
      alert("Auto submit failed");
    }
  };

  /* ---------------- MANUAL SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit the quiz?")) return;
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    try {
      const attemptId = localStorage.getItem("attemptId");
      const formatted = Object.keys(answers).map(qId => ({
        questionId: Number(qId),
        selectedAnswer: answers[qId]
      }));

      clearInterval(timerRef.current);
      localStorage.removeItem(`quizEndTime_${attemptId}`);

      const result = await submitAttempt(attemptId, formatted);
      navigate("/result", { state: result });
    } catch {
      alert("Submit failed");
    }
  };

  /* ---------------- UI HELPERS ---------------- */
  const handleOptionChange = (qid, opt) => {
    setAnswers(prev => ({ ...prev, [qid]: opt }));
    setAnsweredQuestions(prev => new Set(prev).add(qid));
  };

  const formatTime = s => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const calculateProgress = () =>
    ((currentQuestion + 1) / questions.length) * 100;

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  if (loading || !questions.length) return null;

  const q = questions[currentQuestion];

  return (
    <div className="container-fluid mt-4 mb-5 px-4 px-lg-5">

      {/* ================= HEADER ================= */}
      <div className="card shadow-lg border-0 mb-4" style={{ borderRadius: "15px", borderLeft: "4px solid #0d6efd" }}>
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="fw-bold mb-1">Quiz In Progress</h5>
              <p className="text-muted small mb-0">
                Complete all questions before time runs out
              </p>
            </div>

            <div className="col-md-6">
              <div className="d-flex justify-content-between">
                <div className="text-center">
                  <div className={`fw-bold fs-4 ${
                    timeLeft <= 300 ? "text-danger" :
                    timeLeft <= 600 ? "text-warning" : "text-success"
                  }`}>
                    {formatTime(timeLeft)}
                  </div>
                  <small className="text-muted">Time Left</small>
                </div>

                <div className="text-center">
                  <div className="fw-bold fs-4">
                    {answeredCount}/{totalQuestions}
                  </div>
                  <small className="text-muted">Answered</small>
                </div>

                <div className="text-center">
                  <div className="fw-bold fs-4">
                    {currentQuestion + 1}/{totalQuestions}
                  </div>
                  <small className="text-muted">Current</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="row">

        {/* QUESTION NAV */}
        <div className="col-lg-3 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="row g-2">
                {questions.map((question, index) => (
                  <div className="col-4" key={question.id}>
                    <button
                      className={`btn w-100 ${
                        index === currentQuestion
                          ? "btn-primary"
                          : answeredQuestions.has(question.id)
                          ? "btn-success"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 pt-3 border-top">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small">Attempted:</span>
                  <span className="fw-bold text-success">{answeredCount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small">Remaining:</span>
                  <span className="fw-bold text-secondary">
                    {totalQuestions - answeredCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUESTION AREA */}
        <div className="col-lg-9">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">
                {currentQuestion + 1}. {q.questionText}
              </h5>

              <div className="row g-4">
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === opt;
                  return (
                    <div className="col-12 col-xl-6" key={i}>
                      <button
                        className={`btn w-100 text-start p-4 d-flex align-items-start ${
                          selected ? "btn-primary text-white" : "btn-light border"
                        }`}
                        onClick={() => handleOptionChange(q.id, opt)}
                        style={{
                          borderRadius: "12px",
                          minHeight: "110px",
                          whiteSpace: "normal"
                        }}
                      >
                        <strong className="me-3">
                          {String.fromCharCode(65 + i)}.
                        </strong>
                        {opt}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= NAV ================= */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(p => p - 1)}
        >
          Previous
        </button>

        {currentQuestion < totalQuestions - 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => setCurrentQuestion(p => p + 1)}
          >
            Next
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizAttempt;
