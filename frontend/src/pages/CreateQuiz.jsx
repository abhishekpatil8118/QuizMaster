import { useEffect, useState } from "react";
import { createQuiz } from "../api/quizApi";
import api from "../api/axios";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [technology, setTechnology] = useState("");
  const [duration, setDuration] = useState(10);
  const [questionCount, setQuestionCount] = useState(1);

  const [technologies, setTechnologies] = useState([]);
  const [questionCountMap, setQuestionCountMap] = useState({});
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [error, setError] = useState("");

  // 🔹 Load questions & build technology → count map (unchanged)
  useEffect(() => {
    api.get("/api/questions/getAllQuestion")
      .then(res => {
        const map = res.data.reduce((acc, q) => {
          acc[q.technology] = (acc[q.technology] || 0) + 1;
          return acc;
        }, {});

        setQuestionCountMap(map);
        setTechnologies(Object.keys(map));
      })
      .catch(() => setError("Failed to load technologies"));
  }, []);

  // 🔹 Handle submit (unchanged)
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!technology) {
      setError("Please select a technology");
      return;
    }

    if (questionCount > maxQuestions) {
      setError(
        `Number of questions cannot exceed ${maxQuestions} for ${technology}`
      );
      return;
    }

    const payload = {
      title,
      technology,
      duration: Number(duration),
      totalQuestions: Number(questionCount)
    };

    try {
      await createQuiz(payload);
      alert("Quiz created successfully");

      // Reset form
      setTitle("");
      setTechnology("");
      setDuration(10);
      setQuestionCount(1);
      setMaxQuestions(0);
    } catch (err) {
      setError(err.response?.data || "Cannot connect to server");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          {/* Header with subtle icon */}
          <div className="mb-4 text-center">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
              <i className="bi bi-plus-circle-fill text-primary fs-1"></i>
            </div>
            <h2 className="fw-bold text-dark mb-2">Create New Quiz</h2>
            <p className="text-muted mb-0">
              Design and configure a new quiz with custom settings
            </p>
          </div>

          {/* Stats badge */}
          {technologies.length > 0 && (
            <div className="alert alert-light border mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-database text-primary me-2"></i>
                  <span className="fw-medium">Available: {technologies.length} technologies</span>
                </div>
                <span className="badge bg-primary px-3 py-2">
                  {Object.values(questionCountMap).reduce((a, b) => a + b, 0)} total questions
                </span>
              </div>
            </div>
          )}

          {/* Card with subtle shadow */}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger border-0 mb-4 d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-3 fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={submit}>

                {/* Quiz Title */}
                <div className="mb-4">
                  <label className="form-label fw-semibold mb-2 d-flex align-items-center">
                    <i className="bi bi-card-heading text-primary me-2"></i>
                    Quiz Title
                  </label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="e.g. Java Basics Test, Advanced React Quiz"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Technology */}
                <div className="mb-4">
                  <label className="form-label fw-semibold mb-2 d-flex align-items-center">
                    <i className="bi bi-cpu text-primary me-2"></i>
                    Technology / Subject
                  </label>
                  <select
                    className="form-select form-select-lg"
                    value={technology}
                    onChange={(e) => {
                      const tech = e.target.value;
                      setTechnology(tech);
                      setMaxQuestions(questionCountMap[tech] || 0);
                      setQuestionCount(1);
                    }}
                    required
                  >
                    <option value="">Select a technology</option>
                    {technologies.map(t => (
                      <option key={t} value={t}>
                        {t} ({questionCountMap[t]} questions)
                      </option>
                    ))}
                  </select>

                  {/* Technology info */}
                  {technology && (
                    <div className="mt-2 alert alert-success py-2">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      <span className="fw-medium">{maxQuestions} questions available</span>
                    </div>
                  )}
                </div>

                {/* Duration & Questions Row */}
                <div className="row g-3 mb-4">
                  {/* Duration */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2 d-flex align-items-center">
                      <i className="bi bi-clock text-primary me-2"></i>
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    />
                    <small className="text-muted mt-1">
                      Time allowed for the quiz
                    </small>
                  </div>

                  {/* Questions */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold mb-2 d-flex align-items-center">
                      <i className="bi bi-question-circle text-primary me-2"></i>
                      Number of Questions
                    </label>
                    <div className="input-group">
                      <input
                        type="number"
                        className={`form-control ${questionCount > maxQuestions ? 'is-invalid' : ''}`}
                        min="1"
                        max={maxQuestions}
                        value={questionCount}
                        onChange={(e) => setQuestionCount(e.target.value)}
                        required
                      />
                      <span className="input-group-text bg-light">
                        / {maxQuestions} max
                      </span>
                    </div>
                    {questionCount > maxQuestions && (
                      <div className="text-danger small mt-1">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        Cannot exceed {maxQuestions} questions
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-muted">Form completion</small>
                    <small className="fw-medium">
                      {technology && title && duration && questionCount ? 'Complete' : 'Incomplete'}
                    </small>
                  </div>
                  <div className="progress" style={{height: "4px"}}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{
                        width: technology && title && duration && questionCount ? '100%' : 
                               technology && title ? '50%' : '25%'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className="btn btn-success w-100 fw-semibold py-3 d-flex align-items-center justify-content-center gap-2"
                  disabled={maxQuestions === 0}
                  type="submit"
                >
                  <i className="bi bi-plus-circle"></i>
                  {maxQuestions === 0 ? 'No Questions Available' : 'Create Quiz'}
                  <i className="bi bi-arrow-right"></i>
                </button>

              </form>

            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-4 text-center">
            <div className="d-inline-flex align-items-center p-3 rounded bg-light border">
              <i className="bi bi-info-circle text-primary me-2"></i>
              <p className="mb-0 text-muted small">
                Ensure sufficient questions exist before creating a quiz.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;