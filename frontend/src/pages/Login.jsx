import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login({ username, password });

      localStorage.setItem("token", res.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.id,
          username: res.username,
          role: res.role
        })
      );

      if (res.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/quizzes");
      }
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#f8f9fa",
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(13, 110, 253, 0.05) 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, rgba(25, 135, 84, 0.05) 0%, transparent 20%),
          radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.05) 0%, transparent 30%)
        `
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-5 col-lg-4">
          {/* Login Card */}
          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(0, 0, 0, 0.08)"
            }}
          >
            {/* Card Header */}
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <div className="text-center">
                <div className="mb-3">
                  <div
                    className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="bi bi-pencil-square text-primary fs-2"></i>
                  </div>
                </div>
                <h3 className="fw-bold text-dark mb-2">Welcome to QuizMaster</h3>
                
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* Error Message */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-3"></i>
                  <div className="fw-medium">{error}</div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin}>
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label fw-semibold mb-1">
                    <i className="bi bi-person-fill text-primary me-2"></i>
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label fw-semibold mb-1">
                    <i className="bi bi-lock-fill text-primary me-2"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Login Button */}
                <button
                  className="btn btn-primary w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right"></i>
                      Login
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="position-relative my-4">
                <hr />
                <div className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                  New to QuizMaster?
                </div>
              </div>

              {/* Register */}
              <div className="text-center">
                <Link
                  to="/register"
                  className="btn btn-outline-primary w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-person-plus"></i>
                  Create New Account
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <h4 className="fw-bold text-primary mb-1">QuizMaster</h4>
            <p className="text-muted small">Test • Learn • Improve</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
