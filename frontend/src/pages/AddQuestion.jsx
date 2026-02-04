import { useState } from "react";
import { addQuestion } from "../api/questionApi";

function AddQuestion() {
  // Common technology
  const [technology, setTechnology] = useState("");

  // Dynamic question cards
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: ""
    }
  ]);

  // Handle field changes
  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;

    // Reset correct answer if options change
    if (field.startsWith("option")) {
      updated[index].correctAnswer = "";
    }

    setQuestions(updated);
  };

  // Add new empty question card
  const addNewQuestionCard = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: ""
      }
    ]);
  };

  // Remove a question card
  const removeQuestionCard = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Submit all questions
  const submitAllQuestions = async () => {
    try {
      for (const q of questions) {
        if (!q.questionText || !q.correctAnswer) continue;

        await addQuestion({
          ...q,
          technology
        });
      }

      // Reset after submit
      setQuestions([
        {
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: ""
        }
      ]);
    } catch (err) {
      alert("Failed to add questions");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">Add Quiz Questions</h2>
        <p className="text-muted mb-0">
          Create multiple-choice questions for a specific technology.
          You can add multiple questions at once and submit them together.
        </p>
      </div>

      {/* Technology */}
      <div className="card shadow-sm mb-4" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <label className="form-label fw-semibold">
            Technology / Subject
          </label>
          <input
            className="form-control"
            placeholder="e.g. Java, Python, React"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            required
          />
          <small className="text-muted">
            All questions below will be linked to this technology.
          </small>
        </div>
      </div>

      {/* Question Cards */}
      {questions.map((q, index) => (
        <div className="card shadow-sm mb-4 border-0" key={index}>
          <div className="card-body">

            {/* Card Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-semibold">
                Question {index + 1}
              </h5>

              {questions.length > 1 && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeQuestionCard(index)}
                  title="Remove this question"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Question Text */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Question Statement
              </label>
              <input
                className="form-control"
                placeholder="Enter the question text"
                value={q.questionText}
                onChange={(e) =>
                  handleChange(index, "questionText", e.target.value)
                }
              />
            </div>

            {/* Options */}
            <div className="row">
              {["A", "B", "C", "D"].map((opt) => (
                <div className="col-md-6 mb-3" key={opt}>
                  <label className="form-label fw-semibold">
                    Option {opt}
                  </label>
                  <input
                    className="form-control"
                    placeholder={`Enter option ${opt}`}
                    value={q[`option${opt}`]}
                    onChange={(e) =>
                      handleChange(index, `option${opt}`, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Correct Answer */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Correct Answer
              </label>
              <select
                className="form-select"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleChange(index, "correctAnswer", e.target.value)
                }
              >
                <option value="">Select the correct option</option>
                {q.optionA && <option value={q.optionA}>{q.optionA}</option>}
                {q.optionB && <option value={q.optionB}>{q.optionB}</option>}
                {q.optionC && <option value={q.optionC}>{q.optionC}</option>}
                {q.optionD && <option value={q.optionD}>{q.optionD}</option>}
              </select>
              <small className="text-muted">
                Correct answer resets automatically if options are changed.
              </small>
            </div>
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary fw-semibold"
          type="button"
          onClick={addNewQuestionCard}
        >
          + Add Another Question
        </button>

        <button
          className="btn btn-success fw-semibold px-4"
          type="button"
          onClick={submitAllQuestions}
          disabled={!technology}
        >
          Submit All Questions
        </button>
      </div>
    </div>
  );
}

export default AddQuestion;
