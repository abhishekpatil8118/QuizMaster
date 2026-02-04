import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="container mt-5 text-center">
        <h4 className="text-muted">No result data available</h4>
      </div>
    );
  }

  const { score, totalQuestions, autoSubmitted } = state;

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 50;

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "520px", width: "100%" }}
      >
        <div className="card-body text-center p-4">

          {/* Header */}
          <h2 className="fw-bold mb-2">
            Quiz Result
          </h2>
          <p className="text-muted mb-4">
            Your quiz has been successfully submitted.
          </p>

          {/* Status Badge */}
          <div className="mb-4">
            <span
              className={`badge px-4 py-2 fs-6 ${
                passed ? "bg-success" : "bg-danger"
              }`}
            >
              {passed ? "PASSED 🎉" : "FAILED ❌"}
            </span>
          </div>

          {/* Score Circle */}
          <div className="mb-4">
            <div
              className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
              style={{
                width: "140px",
                height: "140px",
                backgroundColor: passed ? "#198754" : "#dc3545",
                color: "#fff",
                fontSize: "32px",
                fontWeight: "bold"
              }}
            >
              {percentage}%
            </div>
          </div>

          {/* Score Details */}
          <div className="row text-center mb-4">
            <div className="col">
              <h5 className="fw-semibold mb-1">
                {score}
              </h5>
              <small className="text-muted">
                Correct Answers
              </small>
            </div>
            <div className="col">
              <h5 className="fw-semibold mb-1">
                {totalQuestions}
              </h5>
              <small className="text-muted">
                Total Questions
              </small>
            </div>
          </div>

          {/* Auto-submit info */}
          {autoSubmitted && (
            <div className="alert alert-warning py-2">
              Quiz was auto-submitted due to time expiry.
            </div>
          )}

          {/* Message */}
          <p className="text-muted">
            {passed
              ? "Great job! You have successfully passed the quiz."
              : "Keep practicing! Review the concepts and try again."}
          </p>

          {/* Actions */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/quizzes")}
            >
              Back to Quizzes
            </button>

            <button
              className="btn btn-success"
              onClick={() => navigate("/my-attempts")}
            >
              View My Attempts
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Result;
