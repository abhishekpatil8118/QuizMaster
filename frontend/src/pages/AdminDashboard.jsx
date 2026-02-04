import { Link } from "react-router-dom";

function AdminDashboard() {
  const adminCards = [
    {
      title: "Manage Questions",
      description: "Create, update, and maintain the question bank used across all quizzes to ensure quality assessments.",
      icon: "bi bi-pencil-square",
      path: "/admin/manage-questions",
      color: "primary",
      gradient: "linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%)",
      hoverGradient: "linear-gradient(135deg, #0b5ed7 0%, #0bb5d4 100%)"
    },
    {
      title: "Create Quiz",
      description: "Design new quizzes by selecting questions, setting time limits, and assigning them to specific technologies.",
      icon: "bi bi-plus-circle",
      path: "/admin/create-quiz",
      color: "success",
      gradient: "linear-gradient(135deg, #198754 0%, #20c997 100%)",
      hoverGradient: "linear-gradient(135deg, #157347 0%, #1cb38c 100%)"
    },
    {
      title: "Quiz Attempts",
      description: "Monitor user participation, review quiz submissions, and analyze scores for performance tracking.",
      icon: "bi bi-bar-chart",
      path: "/admin/attempts",
      color: "dark",
      gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      hoverGradient: "linear-gradient(135deg, #253342 0%, #2d3e50 100%)"
    },
    {
      title: "Delete Quizzes",
      description: "Review existing quizzes and permanently remove outdated or incorrect quizzes from the system.",
      icon: "bi bi-trash",
      path: "/admin/delete-quiz",
      color: "danger",
      gradient: "linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)",
      hoverGradient: "linear-gradient(135deg, #c82333 0%, #e46c10 100%)"
    }
  ];

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "1200px" }}>
      {/* Page Header */}
      <div className="mb-5 text-center">
        <div className="position-relative d-inline-block mb-4">
          <div className="position-absolute top-0 start-100 translate-middle bg-warning rounded-circle" 
               style={{width: "12px", height: "12px", opacity: 0.8}}></div>
          <h2 className="fw-bold display-5" style={{
            background: "linear-gradient(135deg, #6f42c1 0%, #0d6efd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 8px rgba(111, 66, 193, 0.15)"
          }}>
            Administrator Dashboard
          </h2>
        </div>
        
      </div>

      

      {/* Feature Cards Grid */}
      <div className="row g-4">
        {adminCards.map((card, index) => (
          <div className="col-lg-6" key={index}>
            <div className="card shadow-sm border-0 h-100 position-relative overflow-hidden"
                 style={{
                   borderRadius: "15px",
                   transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                   border: "1px solid rgba(0, 0, 0, 0.05)"
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = "translateY(-8px)";
                   e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = "translateY(0)";
                   e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.05)";
                 }}>
              
              {/* Decorative Corner */}
              <div className="position-absolute top-0 end-0 bg-primary bg-opacity-10" 
                   style={{width: "80px", height: "80px", borderRadius: "0 15px 0 80px"}}></div>
              
              <div className="card-body p-4 d-flex flex-column position-relative">
                
                {/* Icon with Background */}
                <div className="mb-4">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{
                           width: "60px",
                           height: "60px",
                           background: card.gradient
                         }}>
                      <i className={`${card.icon} text-white fs-4`}></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1">{card.title}</h4>
                      <div className={`badge bg-${card.color} bg-opacity-10 text-${card.color} px-3 py-1 rounded-pill small`}>
                        <i className="bi bi-shield-lock me-1"></i>
                        Admin Only
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted flex-grow-1 mb-4" style={{ lineHeight: "1.6" }}>
                  {card.description}
                </p>

                {/* Action Button */}
                <div className="mt-auto">
                  <Link
                    to={card.path}
                    className="btn fw-semibold w-100 py-3 rounded-pill text-white d-flex align-items-center justify-content-center"
                    style={{
                      background: card.gradient,
                      border: "none",
                      transition: "all 0.3s ease",
                      fontSize: "16px"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = card.hoverGradient;
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = card.gradient;
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <i className={`${card.icon} me-2`}></i>
                    {card.title}
                    <i className="bi bi-arrow-right-short ms-2 fs-5"></i>
                  </Link>
                </div>

              </div>

              {/* Hover Effect Background */}
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-5" 
                   style={{
                     opacity: 0,
                     transition: "opacity 0.3s ease",
                     borderRadius: "15px",
                     pointerEvents: "none"
                   }}
                   onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                   onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
              </div>
            </div>
          </div>
        ))}
      </div>

      

      
    </div>
  );
}

export default AdminDashboard;