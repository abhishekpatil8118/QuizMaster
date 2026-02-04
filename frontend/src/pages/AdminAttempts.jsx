import { useEffect, useState } from "react";
import { getAllAttempts } from "../api/attemptApi";

// ✅ Date formatter (unchanged)
function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
}

function AdminAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllAttempts()
      .then(res => {
        setAttempts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quiz attempts");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "1200px" }}>
      

      {/* Stats Overview */}
      <div className="row mb-5 g-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{
            background: "linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%)",
            borderRadius: "15px"
          }}>
            <div className="card-body text-white p-4">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                  <i className="bi bi-people fs-4"></i>
                </div>
                <div>
                  <h2 className="fw-bold mb-0">{attempts.length}</h2>
                  <p className="mb-0 opacity-90">Total Attempts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{
            background: "linear-gradient(135deg, #198754 0%, #20c997 100%)",
            borderRadius: "15px"
          }}>
            <div className="card-body text-white p-4">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                  <i className="bi bi-person-check fs-4"></i>
                </div>
                <div>
                  <h2 className="fw-bold mb-0">
                    {[...new Set(attempts.map(a => a.username))].length}
                  </h2>
                  <p className="mb-0 opacity-90">Unique Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{
            background: "linear-gradient(135deg, #6f42c1 0%, #d63384 100%)",
            borderRadius: "15px"
          }}>
            <div className="card-body text-white p-4">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                  <i className="bi bi-card-checklist fs-4"></i>
                </div>
                <div>
                  <h2 className="fw-bold mb-0">
                    {[...new Set(attempts.map(a => a.quizTitle))].length}
                  </h2>
                  <p className="mb-0 opacity-90">Quizzes Taken</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{
            background: "linear-gradient(135deg, #fd7e14 0%, #ffc107 100%)",
            borderRadius: "15px"
          }}>
            <div className="card-body text-white p-4">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3">
                  <i className="bi bi-bar-chart fs-4"></i>
                </div>
                <div>
                  <h2 className="fw-bold mb-0">
                    {attempts.length > 0 
                      ? (attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length).toFixed(1)
                      : "0.0"}
                  </h2>
                  <p className="mb-0 opacity-90">Avg Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger py-3 border-0 shadow-sm mb-4" style={{
          borderRadius: "12px",
          background: "linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)",
          color: "white",
          borderLeft: "4px solid white"
        }}>
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle fs-4 me-3"></i>
            <div>
              <h6 className="fw-bold mb-0">Failed to Load Data</h6>
              <p className="mb-0 opacity-90">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body p-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton-row mb-3">
                <div className="skeleton-line" style={{width: "100%", height: "50px", borderRadius: "10px"}}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attempts Table */}
      {!loading && (
        <div className="card shadow-lg border-0 overflow-hidden" style={{
          borderRadius: "15px",
          border: "1px solid rgba(0, 0, 0, 0.05)"
        }}>
          <div className="card-header border-0 py-4" style={{
            background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0 text-white fw-bold">
                  <i className="bi bi-list-task me-2"></i>
                  All Attempts
                </h3>
                <p className="mb-0 text-white opacity-75">
                  Detailed view of user submissions
                </p>
              </div>
              <div className="text-white">
                <span className="badge bg-primary px-3 py-2 fw-semibold">
                  {attempts.length} Records
                </span>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{
                  background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  borderBottom: "2px solid #dee2e6"
                }}>
                  <tr>
                    <th className="py-3 ps-4 fw-semibold text-dark" style={{ width: "60px", borderTop: "none" }}>
                      #
                    </th>
                    <th className="py-3 fw-semibold text-dark" style={{ borderTop: "none" }}>
                      <i className="bi bi-person me-2"></i>
                      User Name
                    </th>
                    <th className="py-3 fw-semibold text-dark" style={{ borderTop: "none" }}>
                      <i className="bi bi-card-text me-2"></i>
                      Quiz Title
                    </th>
                    <th className="py-3 fw-semibold text-dark" style={{ borderTop: "none" }}>
                      <i className="bi bi-trophy me-2"></i>
                      Score
                    </th>
                    <th className="py-3 fw-semibold text-dark" style={{ borderTop: "none" }}>
                      <i className="bi bi-question-circle me-2"></i>
                      Total Questions
                    </th>
                    <th className="py-3 fw-semibold text-dark" style={{ borderTop: "none" }}>
                      <i className="bi bi-clock me-2"></i>
                      Submitted At
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attempts.length === 0 && !error && (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="text-muted">
                          <i className="bi bi-inbox fs-1 mb-3 d-block opacity-50"></i>
                          <h5 className="fw-semibold">No attempts yet</h5>
                          <p className="mb-0">User quiz attempts will appear here</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {attempts.map((a, index) => {
                    const percentage = (a.score / a.totalQuestions) * 100;
                    let scoreColor = "success";
                    if (percentage < 40) scoreColor = "danger";
                    else if (percentage < 70) scoreColor = "warning";

                    return (
                      <tr key={a.id} 
                          className="position-relative"
                          style={{
                            transition: "all 0.2s ease",
                            cursor: "pointer"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(13, 110, 253, 0.03)";
                            e.currentTarget.style.transform = "translateX(4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "";
                            e.currentTarget.style.transform = "translateX(0)";
                          }}>
                        <td className="ps-4 py-3">
                          <span className="badge bg-secondary bg-opacity-10 text-dark fw-bold px-3 py-2 rounded-pill">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                                 style={{width: "40px", height: "40px"}}>
                              <i className="bi bi-person fs-5"></i>
                            </div>
                            <div>
                              <span className="fw-semibold">{a.username}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="fw-medium">{a.quizTitle}</div>
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center">
                            <span className={`badge bg-${scoreColor} bg-opacity-10 text-${scoreColor} px-3 py-2 me-2 rounded-pill fw-bold`}>
                              {a.score}/{a.totalQuestions}
                            </span>
                            <div className="progress flex-grow-1" style={{width: "80px", height: "6px"}}>
                              <div 
                                className={`progress-bar bg-${scoreColor}`}
                                style={{width: `${percentage}%`}}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="badge bg-dark bg-opacity-10 text-dark px-3 py-2 rounded-pill">
                            {a.totalQuestions}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center text-muted">
                            <i className="bi bi-calendar3 me-2"></i>
                            <span className="small">{formatDate(a.submittedAt)}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer with summary */}
          <div className="card-footer border-0 py-3" style={{
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
          }}>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 text-muted small">
                <i className="bi bi-info-circle me-1"></i>
                Scores represent correct answers. Hover over rows for details.
              </p>
              <div className="text-muted small">
                Showing <span className="fw-semibold">{attempts.length}</span> attempt{attempts.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAttempts;