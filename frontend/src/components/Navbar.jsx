import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4 py-2" 
         style={{
           background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
           borderBottom: "1px solid rgba(255, 193, 7, 0.1)",
           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
         }}>
      
      {/* Brand with enhanced styling */}
      <Link className="navbar-brand d-flex flex-column position-relative" to="/">
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative">
            <div className="position-absolute top-0 start-100 translate-middle bg-warning rounded-circle" 
                 style={{width: "8px", height: "8px", opacity: 0.8}}></div>
            <span className="fs-3 fw-bold text-warning" style={{textShadow: "0 2px 4px rgba(0,0,0,0.3)"}}>
              QuizMaster
            </span>
          </div>
        </div>
        <small className="text-light opacity-85 mt-1" style={{ 
          fontSize: "11px", 
          letterSpacing: "1.5px",
          fontWeight: "300"
        }}>
          TEST • LEARN • IMPROVE
        </small>
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center gap-3">

          {/* PUBLIC */}
          {!user && (
            <>
              <li className="nav-item">
                <Link 
                  className="nav-link fw-medium px-3 py-2 rounded-3"
                  to="/login"
                  style={{
                    transition: "all 0.3s ease",
                    border: "1px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 193, 7, 0.3)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 193, 7, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className="btn btn-warning fw-semibold px-4 py-2 rounded-3"
                  to="/register"
                  style={{
                    transition: "all 0.3s ease",
                    border: "none",
                    boxShadow: "0 4px 8px rgba(255, 193, 7, 0.2)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(255, 193, 7, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(255, 193, 7, 0.2)";
                  }}
                >
                  Get Started
                </Link>
              </li>
            </>
          )}

          {/* USER */}
          {user?.role === "USER" && (
            <>
              <li className="nav-item">
                <Link 
                  className="nav-link fw-medium d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                  to="/quizzes"
                  style={{
                    transition: "all 0.3s ease",
                    border: "1px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(13, 110, 253, 0.3)";
                    e.currentTarget.style.backgroundColor = "rgba(13, 110, 253, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <i className="bi bi-card-checklist"></i>
                  Available Quizzes
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className="nav-link fw-medium d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                  to="/my-attempts"
                  style={{
                    transition: "all 0.3s ease",
                    border: "1px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(25, 135, 84, 0.3)";
                    e.currentTarget.style.backgroundColor = "rgba(25, 135, 84, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <i className="bi bi-bar-chart"></i>
                  My Attempts
                </Link>
              </li>

              <li className="nav-item">
                <div className="px-3 py-2 rounded-3 text-light small fw-medium"
                     style={{
                       background: "rgba(255, 255, 255, 0.1)",
                       backdropFilter: "blur(10px)",
                       border: "1px solid rgba(255, 255, 255, 0.1)"
                     }}>
                  <i className="bi bi-person-circle me-2"></i>
                  Welcome,{" "}
                  <span className="fw-semibold text-warning">
                    {user?.username || user?.name}
                  </span>
                </div>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-danger fw-semibold px-4 py-2 rounded-3 d-flex align-items-center gap-2"
                  onClick={logout}
                  style={{
                    transition: "all 0.3s ease",
                    borderWidth: "1.5px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.backgroundColor = "rgba(220, 53, 69, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </button>
              </li>
            </>
          )}

          {/* ADMIN */}
          {user?.role === "ADMIN" && (
            <>
              <li className="nav-item">
                <Link 
                  className="nav-link fw-medium d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                  to="/admin"
                  style={{
                    transition: "all 0.3s ease",
                    border: "1px solid transparent",
                    background: "rgba(255, 193, 7, 0.1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 193, 7, 0.5)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 193, 7, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.backgroundColor = "rgba(255, 193, 7, 0.1)";
                  }}
                >
                  <i className="bi bi-speedometer2"></i>
                  Admin Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <div className="px-3 py-2 rounded-3 text-warning small fw-semibold d-flex align-items-center gap-2"
                     style={{
                       background: "rgba(255, 193, 7, 0.1)",
                       border: "1px solid rgba(255, 193, 7, 0.2)"
                     }}>
                  <i className="bi bi-shield-check"></i>
                  Administrator
                </div>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger fw-semibold px-4 py-2 rounded-3 d-flex align-items-center gap-2"
                  onClick={logout}
                  style={{
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 8px rgba(220, 53, 69, 0.2)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(220, 53, 69, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(220, 53, 69, 0.2)";
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;