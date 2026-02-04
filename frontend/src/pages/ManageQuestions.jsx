import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllQuestions,
  updateQuestion,
  deleteQuestion
} from "../api/questionApi";

function ManageQuestions() {
  const [questions, setQuestions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  // New states for search, sort, and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [sortBy, setSortBy] = useState(""); // "", "question", "technology"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc", "desc"

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await getAllQuestions();
      setQuestions(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const startEdit = (q) => {
    setEditId(q.id);
    setForm({ ...q });
  };

  const saveUpdate = async (id) => {
    if (!form.technology) {
      alert("Technology is required");
      return;
    }
    await updateQuestion(id, form);
    setEditId(null);
    loadQuestions();
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    await deleteQuestion(id);
    loadQuestions();
  };

  const technologies = [...new Set(questions.map(q => q.technology))];

  // Filter and sort questions
  const filteredQuestions = questions.filter(q => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.technology.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ["A", "B", "C", "D"].some(opt => 
        q[`option${opt}`]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Technology filter
    const matchesTechnology = !selectedTechnology || q.technology === selectedTechnology;
    
    return matchesSearch && matchesTechnology;
  });

  // Sort questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (!sortBy) return 0;
    
    let aValue, bValue;
    
    if (sortBy === "question") {
      aValue = a.questionText.toLowerCase();
      bValue = b.questionText.toLowerCase();
    } else if (sortBy === "technology") {
      aValue = a.technology.toLowerCase();
      bValue = b.technology.toLowerCase();
    }
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Toggle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTechnology("");
    setSortBy("");
    setSortOrder("asc");
  };

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: "1400px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Manage Questions</h2>
          <p className="text-muted mb-0">
            Edit, update, or delete questions from the question bank
          </p>
        </div>

        <Link
          to="/admin/add-question"
          className="btn btn-primary fw-semibold d-flex align-items-center gap-2 px-4 py-2"
        >
          <i className="bi bi-plus-circle"></i>
          Add New Question
        </Link>
      </div>

      {/* Stats Bar */}
      {questions.length > 0 && (
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ background: "linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%)" }}>
              <div className="card-body text-white p-3">
                <div className="d-flex align-items-center">
                  <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                    <i className="bi bi-question-circle fs-4"></i>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">{questions.length}</h4>
                    <p className="mb-0 opacity-90">Total Questions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ background: "linear-gradient(135deg, #198754 0%, #20c997 100%)" }}>
              <div className="card-body text-white p-3">
                <div className="d-flex align-items-center">
                  <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                    <i className="bi bi-cpu fs-4"></i>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">{technologies.length}</h4>
                    <p className="mb-0 opacity-90">Technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          
        </div>
      )}

      {/* Search, Sort, and Filter Bar */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <div className="row g-3">
            {/* Search Input */}
            <div className="col-md-4">
              <label className="form-label fw-semibold d-flex align-items-center gap-2">
                <i className="bi bi-search text-primary"></i>
                Search Questions
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by question, option, or technology..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Technology Filter */}
            <div className="col-md-3">
              <label className="form-label fw-semibold d-flex align-items-center gap-2">
                <i className="bi bi-filter text-primary"></i>
                Filter by Technology
              </label>
              <select
                className="form-select"
                value={selectedTechnology}
                onChange={(e) => setSelectedTechnology(e.target.value)}
              >
                <option value="">All Technologies</option>
                {technologies.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="col-md-3">
              <label className="form-label fw-semibold d-flex align-items-center gap-2">
                <i className="bi bi-sort-down text-primary"></i>
                Sort By
              </label>
              <div className="d-flex gap-2">
                <button
                  className={`btn btn-sm ${sortBy === "question" ? "btn-primary" : "btn-outline-primary"} d-flex align-items-center gap-1`}
                  onClick={() => handleSort("question")}
                >
                  Question
                  {sortBy === "question" && (
                    <i className={`bi bi-arrow-${sortOrder === "asc" ? "up" : "down"}`}></i>
                  )}
                </button>
                <button
                  className={`btn btn-sm ${sortBy === "technology" ? "btn-primary" : "btn-outline-primary"} d-flex align-items-center gap-1`}
                  onClick={() => handleSort("technology")}
                >
                  Technology
                  {sortBy === "technology" && (
                    <i className={`bi bi-arrow-${sortOrder === "asc" ? "up" : "down"}`}></i>
                  )}
                </button>
                {sortBy && (
                  <button
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                    onClick={() => {
                      setSortBy("");
                      setSortOrder("asc");
                    }}
                  >
                    <i className="bi bi-x"></i>
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Clear All Button */}
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={clearFilters}
                disabled={!searchTerm && !selectedTechnology && !sortBy}
              >
                <i className="bi bi-arrow-clockwise"></i>
                Clear All
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedTechnology || sortBy) && (
            <div className="mt-3 pt-3 border-top">
              <div className="d-flex align-items-center gap-2">
                <small className="fw-semibold text-muted">Active Filters:</small>
                {searchTerm && (
                  <span className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1">
                    Search: "{searchTerm}"
                    <button
                      className="btn btn-sm p-0"
                      onClick={() => setSearchTerm("")}
                      style={{ lineHeight: 1 }}
                    >
                      <i className="bi bi-x text-primary"></i>
                    </button>
                  </span>
                )}
                {selectedTechnology && (
                  <span className="badge bg-info bg-opacity-10 text-info d-flex align-items-center gap-1">
                    Tech: {selectedTechnology}
                    <button
                      className="btn btn-sm p-0"
                      onClick={() => setSelectedTechnology("")}
                      style={{ lineHeight: 1 }}
                    >
                      <i className="bi bi-x text-info"></i>
                    </button>
                  </span>
                )}
                {sortBy && (
                  <span className="badge bg-warning bg-opacity-10 text-warning d-flex align-items-center gap-1">
                    Sorted: {sortBy} ({sortOrder})
                    <button
                      className="btn btn-sm p-0"
                      onClick={() => {
                        setSortBy("");
                        setSortOrder("asc");
                      }}
                      style={{ lineHeight: 1 }}
                    >
                      <i className="bi bi-x text-warning"></i>
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4">
          <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
          <div>
            <h6 className="fw-bold mb-1">Failed to Load Questions</h6>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading questions...</p>
        </div>
      )}

      {/* Questions Table */}
      {!loading && (
        <div className="card shadow-sm border-0">
          <div className="card-header border-0 bg-white py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0 d-flex align-items-center">
                <i className="bi bi-card-checklist text-primary me-2"></i>
                Question Bank
                <span className="badge bg-primary ms-2">{sortedQuestions.length}</span>
              </h5>
              <small className="text-muted">
                Showing {sortedQuestions.length} of {questions.length} questions
              </small>
            </div>
          </div>
          
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light" style={{ borderBottom: "2px solid #dee2e6" }}>
                  <tr>
                    <th className="py-3 ps-4 fw-semibold text-dark" style={{ width: "60px" }}>#</th>
                    <th className="py-3 fw-semibold text-dark">Question</th>
                    <th className="py-3 fw-semibold text-dark">Options</th>
                    <th className="py-3 fw-semibold text-dark">Correct Answer</th>
                    <th className="py-3 fw-semibold text-dark">Technology</th>
                    <th className="py-3 fw-semibold text-dark text-center" style={{ width: "160px" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedQuestions.map((q, i) => {
                    const isEditing = editId === q.id;
                    
                    return (
                      <tr 
                        key={q.id} 
                        className={isEditing ? "bg-light" : ""}
                        style={{ 
                          transition: "all 0.2s ease",
                          backgroundColor: isEditing ? "rgba(13, 110, 253, 0.05)" : ""
                        }}
                      >
                        {/* Serial Number */}
                        <td className="ps-4">
                          <span className="badge bg-secondary bg-opacity-10 text-dark fw-bold px-3 py-2 rounded-pill">
                            {i + 1}
                          </span>
                        </td>

                        {/* Question Text */}
                        <td>
                          {isEditing ? (
                            <textarea
                              className="form-control border-primary"
                              rows="2"
                              value={form.questionText}
                              onChange={(e) =>
                                setForm({ ...form, questionText: e.target.value })
                              }
                              style={{ borderRadius: "8px" }}
                            />
                          ) : (
                            <div className="fw-medium">{q.questionText}</div>
                          )}
                        </td>

                        {/* Options */}
                        <td>
                          {["A", "B", "C", "D"].map(opt => (
                            <div key={opt} className="mb-1">
                              {isEditing ? (
                                <div className="input-group input-group-sm">
                                  <span className="input-group-text bg-light fw-bold" style={{ width: "30px" }}>
                                    {opt}
                                  </span>
                                  <input
                                    className="form-control border-primary"
                                    value={form[`option${opt}`]}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        [`option${opt}`]: e.target.value
                                      })
                                    }
                                    style={{ borderRadius: "0 8px 8px 0" }}
                                  />
                                </div>
                              ) : (
                                <div className={`d-flex align-items-center ${q.correctAnswer === opt ? 'fw-bold text-success' : 'text-dark'}`}>
                                  <span className="badge bg-light text-dark border me-2" style={{ width: "24px", height: "24px", lineHeight: "24px" }}>
                                    {opt}
                                  </span>
                                  <span>{q[`option${opt}`]}</span>
                                  {q.correctAnswer === opt && (
                                    <i className="bi bi-check-circle-fill text-success ms-2"></i>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </td>

                        {/* Correct Answer */}
                        <td>
                          {isEditing ? (
                            <select
                              className="form-select border-success"
                              value={form.correctAnswer}
                              onChange={(e) =>
                                setForm({ ...form, correctAnswer: e.target.value })
                              }
                              style={{ borderRadius: "8px" }}
                            >
                              {["A", "B", "C", "D"].map(opt => (
                                <option key={opt} value={opt}>Option {opt}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
                              <i className="bi bi-check-circle"></i>
                              {q.correctAnswer}
                            </span>
                          )}
                        </td>

                        {/* Technology */}
                        <td>
                          {isEditing ? (
                            <select
                              className="form-select border-info"
                              value={form.technology}
                              onChange={(e) =>
                                setForm({ ...form, technology: e.target.value })
                              }
                              style={{ borderRadius: "8px" }}
                            >
                              {technologies.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="badge bg-info bg-opacity-10 text-info fw-medium px-3 py-2 rounded-pill">
                              {q.technology}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="text-center">
                          {isEditing ? (
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-success btn-sm fw-semibold px-3 d-flex align-items-center gap-1"
                                onClick={() => saveUpdate(q.id)}
                              >
                                <i className="bi bi-check-lg"></i>
                                Save
                              </button>
                              <button
                                className="btn btn-secondary btn-sm fw-semibold px-3 d-flex align-items-center gap-1"
                                onClick={() => setEditId(null)}
                              >
                                <i className="bi bi-x-lg"></i>
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-warning btn-sm fw-semibold px-3 d-flex align-items-center gap-1"
                                onClick={() => startEdit(q)}
                              >
                                <i className="bi bi-pencil"></i>
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm fw-semibold px-3 d-flex align-items-center gap-1"
                                onClick={() => remove(q.id)}
                              >
                                <i className="bi bi-trash"></i>
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Empty State */}
                  {sortedQuestions.length === 0 && !loading && (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="text-muted">
                          <i className="bi bi-search fs-1 mb-3 d-block opacity-50"></i>
                          <h5 className="fw-semibold">No questions found</h5>
                          <p className="mb-2">
                            {questions.length === 0 
                              ? "Add your first question to get started" 
                              : "No questions match your search criteria"}
                          </p>
                          {(searchTerm || selectedTechnology) && (
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={clearFilters}
                            >
                              <i className="bi bi-arrow-clockwise me-1"></i>
                              Clear filters
                            </button>
                          )}
                          <Link
                            to="/admin/add-question"
                            className="btn btn-primary btn-sm d-inline-flex align-items-center gap-2"
                          >
                            <i className="bi bi-plus-circle"></i>
                            Add Question
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageQuestions;