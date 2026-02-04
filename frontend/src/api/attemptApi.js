import api from "./axios";

export const startAttempt = async (userId, quizId) => {
  const res = await api.post("/attempt/start", {
    userId,
    quizId,
  });
  return res.data;
};

export const submitAttempt = async (attemptId, answers) => {
  const res = await api.post(`/attempt/${attemptId}/submit`, answers);
  return res.data;
};

export const getAllAttempts = async () => {
  return await api.get("/attempt/all");
};

export const getMyAttempts = (userId) =>
  api.get(`/attempt/my/${userId}`);


