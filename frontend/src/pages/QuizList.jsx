import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [technology, setTechnology] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // latest | duration | questions
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/quizzes");
        setQuizzes(res.data);
      } catch (err) {
        alert("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };
    loadQuizzes();
  }, []);

  // Extract unique technologies
  const technologies = [...new Set(quizzes.map(q => q.technology))];

  // UI-only processing
  const processedQuizzes = useMemo(() => {
    let data = [...quizzes];

    if (technology) {
      data = data.filter(q => q.technology === technology);
    }

    if (search) {
      data = data.filter(q =>
        q.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "duration") {
      data.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "questions") {
      data.sort((a, b) => b.totalQuestions - a.totalQuestions);
    }

    return data;
  }, [quizzes, technology, search, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setTechnology("");
    setSortBy("latest");
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "1200px" }}>
      {/* Header */}
      <div className="mb-5 text-center">
        <h2
          className="fw-bold display-6"
          style={{
            background: "linear-gradient(135deg, #0d6efd 0%, #20c997 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Available Quizzes
        </h2>
      </div>

      {/* Stats Bar */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-primary text-white">
            <div className="card-body">
              <h4 className="fw-bold">{quizzes.length}</h4>
              <p className="mb-0">Total Quizzes</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-success text-white">
            <div className="card-body">
              <h4 className="fw-bold">{technologies.length}</h4>
              <p className="mb-0">Technologies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-lg border-0 mb-5">
        <div className="card-body p-4">
          <div className="row g-4">
            {/* Search */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Search Quiz</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by quiz title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Technology */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Technology</label>
              <select
                className="form-select"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
              >
                <option value="">All Technologies</option>
                {technologies.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Sort By</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="duration">Shortest Duration</option>
                <option value="questions">Most Questions</option>
              </select>
            </div>
          </div>

          {(search || technology || sortBy !== "latest") && (
            <div className="mt-4 text-end">
              <button className="btn btn-outline-danger btn-sm" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
          <p className="mt-3">Loading quizzes...</p>
        </div>
      ) : processedQuizzes.length === 0 ? (
        <div className="text-center py-5 text-muted">
          No quizzes found
        </div>
      ) : (
        <div className="row g-4">
          {processedQuizzes.map(q => (
            <div className="col-md-6 col-lg-4" key={q.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column p-4">
                  <span className="badge bg-primary mb-2 align-self-end">
                    {q.technology}
                  </span>

                  <h5 className="fw-bold mb-3">{q.title}</h5>

                  <div className="row mb-4">
                    <div className="col-6 text-center">
                      <strong>{q.duration}</strong>
                      <div className="text-muted small">Minutes</div>
                    </div>
                    <div className="col-6 text-center">
                      <strong>{q.totalQuestions}</strong>
                      <div className="text-muted small">Questions</div>
                    </div>
                  </div>

                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => navigate(`/quiz/${q.id}`)}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 pt-4 border-top text-muted text-end">
        Showing <strong>{processedQuizzes.length}</strong> of{" "}
        <strong>{quizzes.length}</strong> quizzes
      </div>
    </div>
  );
}

export default QuizList;
