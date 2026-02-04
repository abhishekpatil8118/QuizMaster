import { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({
        username,
        email,
        password,
        role: "USER"
      });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center mt-4"
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
          {/* Register Card */}
          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(0, 0, 0, 0.08)"
            }}
          >
            {/* Header */}
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <div className="text-center">
                <div className="mb-3">
                  <div
                    className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="bi bi-person-plus-fill text-success fs-2"></i>
                  </div>
                </div>
                <h3 className="fw-bold text-dark mb-2">Create Account</h3>
                
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* Error */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-3"></i>
                  <div className="fw-medium">{error}</div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleRegister}>
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label fw-semibold mb-1">
                    <i className="bi bi-person-fill text-success me-2"></i>
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold mb-1">
                    <i className="bi bi-envelope-fill text-success me-2"></i>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label fw-semibold mb-1">
                    <i className="bi bi-lock-fill text-success me-2"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Button */}
                <button
                  className="btn btn-success w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle"></i>
                      Register
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="position-relative my-4">
                <hr />
                <div className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                  Already registered?
                </div>
              </div>

              {/* Login Redirect */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="btn btn-outline-success w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  Login Instead
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <h4 className="fw-bold text-success mb-1">QuizMaster</h4>
            <p className="text-muted small">Test • Learn • Improve</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
