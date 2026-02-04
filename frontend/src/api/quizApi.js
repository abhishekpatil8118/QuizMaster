import api from "./axios";

export const createQuiz = (data) => {
  return api.post("/api/quizzes/admin/create", data);
};

export const startQuiz = (quizId) => {
  return api.get(`/api/quizzes/${quizId}/start`);
};

export const startAttempt = (data) => {
  return api.post("/attempt/start", data);
};

export const getAllQuizzes = async () => {
  const res = await api.get("/api/quizzes");
  return res.data;
};

export const getQuizQuestions = async (quizId) => {
  const res = await api.get(`/api/quizzes/${quizId}/questions`);
  return res.data;
};

export const submitQuiz = async (quizId, answers) => {
  const res = await api.post(`/api/quizzes/${quizId}/submit`, {
    answers,
  });
  return res.data;
};

export const deleteQuiz = async (quizId) => {
  return await api.delete(`/api/quizzes/admin/delete/${quizId}`);
};

