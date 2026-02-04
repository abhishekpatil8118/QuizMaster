import { useEffect, useState } from "react";
import { getAllQuizzes, deleteQuiz } from "../api/quizApi";

function DeleteQuiz() {
  const [quizzes, setQuizzes] = useState([]);   // ALWAYS ARRAY
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ LOAD QUIZZES (unchanged)
  const loadQuizzes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllQuizzes();

      if (Array.isArray(data)) {
        setQuizzes(data);
      } else {
        console.error("Unexpected API response:", data);
        setQuizzes([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load quizzes");
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  // ✅ DELETE HANDLER (unchanged)
  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete quiz "${title}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteQuiz(id);
      alert("Quiz deleted successfully");
      loadQuizzes();
    } catch (err) {
      alert("Failed to delete quiz");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-danger">Delete Quizzes</h2>
        <p className="text-muted mb-0">
          Permanently remove quizzes from the system. This action cannot be undone.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger py-2">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center text-muted my-4">
          Loading quizzes...
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: "80px" }}>#</th>
                  <th>Quiz Title</th>
                  <th>Technology</th>
                  <th>Total Questions</th>
                  <th>Duration (min)</th>
                  <th style={{ width: "120px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {quizzes.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No quizzes available to delete.
                    </td>
                  </tr>
                )}

                {quizzes.map((q, index) => (
                  <tr key={q.id}>
                    <td className="fw-semibold">{index + 1}</td>
                    <td>{q.title}</td>
                    <td>{q.technology}</td>
                    <td>{q.totalQuestions}</td>
                    <td>{q.duration}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm fw-semibold"
                        onClick={() => handleDelete(q.id, q.title)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Warning */}
      <p className="text-muted small mt-3">
        Deleting a quiz will also remove all associated attempts and results.
      </p>
    </div>
  );
}

export default DeleteQuiz;
