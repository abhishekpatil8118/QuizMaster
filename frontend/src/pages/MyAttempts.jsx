import { useEffect, useMemo, useState } from "react";
import { getMyAttempts } from "../api/attemptApi";

// Date formatter (UI only)
function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString();
}

function MyAttempts() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [attempts, setAttempts] = useState([]);

  // 🔍 UI states
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date | score
  const [filterScore, setFilterScore] = useState("all"); // all | pass | fail

  useEffect(() => {
    getMyAttempts(user.id).then(res => setAttempts(res.data));
  }, [user.id]);

  // 🔹 Derived UI data (no backend change)
  const processedAttempts = useMemo(() => {
    let data = [...attempts];

    // Search by quiz title
    if (search) {
      data = data.filter(a =>
        a.quizTitle.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by score
    if (filterScore === "pass") {
      data = data.filter(a => a.score >= a.totalQuestions / 2);
    }
    if (filterScore === "fail") {
      data = data.filter(a => a.score < a.totalQuestions / 2);
    }

    // Sort
    if (sortBy === "score") {
      data.sort((a, b) => b.score - a.score);
    } else {
      data.sort(
        (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
      );
    }

    return data;
  }, [attempts, search, sortBy, filterScore]);

  return (
    <div className="container mt-5 mb-5">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">My Quiz Attempts</h2>
        
      </div>

      {/* Controls */}
      <div className="card shadow-sm border-0 mb-3">
        <div className="card-body">
          <div className="row g-3">

            {/* Search */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Search Quiz
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by quiz title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Sort By
              </label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Latest Attempts</option>
                <option value="score">Highest Score</option>
              </select>
            </div>

            {/* Filter */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Filter Result
              </label>
              <select
                className="form-select"
                value={filterScore}
                onChange={(e) => setFilterScore(e.target.value)}
              >
                <option value="all">All Attempts</option>
                <option value="pass">Passed</option>
                <option value="fail">Failed</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* Attempts Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "60px" }}>#</th>
                <th>Quiz Title</th>
                <th>Score</th>
                <th>Total</th>
                <th>Result</th>
                <th>Submitted At</th>
              </tr>
            </thead>

            <tbody>
              {processedAttempts.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No quiz attempts match your criteria.
                  </td>
                </tr>
              )}

              {processedAttempts.map((a, i) => {
                const passed = a.score >= a.totalQuestions / 2;

                return (
                  <tr key={a.id}>
                    <td className="fw-semibold">{i + 1}</td>
                    <td>{a.quizTitle}</td>
                    <td className="fw-semibold">
                      {a.score}
                    </td>
                    <td>{a.totalQuestions}</td>
                    <td>
                      <span
                        className={`badge ${
                          passed ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {passed ? "Pass" : "Fail"}
                      </span>
                    </td>
                    <td>{formatDate(a.submittedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      
    </div>
  );
}

export default MyAttempts;
