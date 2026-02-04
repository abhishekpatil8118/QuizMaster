import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuizList from "./pages/QuizList";
import QuizAttempt from "./pages/QuizAttempt";
import AdminDashboard from "./pages/AdminDashboard";
import AddQuestion from "./pages/AddQuestion";
import ProtectedRoute from "./components/ProtectedRoute";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import AdminAttempts from "./pages/AdminAttempts";
import DeleteQuiz from "./pages/DeleteQuiz";

import ManageQuestions from "./pages/ManageQuestions";
import MyAttempts from "./pages/MyAttempts";



function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/admin/create-quiz" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <CreateQuiz />
          </ProtectedRoute>
        }
        />


        {/* USER */}
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <QuizList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attempt/:quizId"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <QuizAttempt />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-question"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddQuestion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:quizId"
          element={
            <ProtectedRoute role="USER">
              <QuizAttempt />
            </ProtectedRoute>
          }
        />
        <Route path="/result" element={<Result />} />
        <Route
          path="/admin/delete-quiz"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <DeleteQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attempts"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminAttempts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-questions"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ManageQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-attempts"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <MyAttempts />
            </ProtectedRoute>
          }
        />


      </Routes>

    </>
  );
}

export default App;
