import api from "./axios";

export const getAllQuestions = async () => {
  const res = await api.get("/api/questions/getAllQuestion");
  return res.data; // ✅ IMPORTANT
};

export const addQuestion = (data) =>
  api.post("/api/questions/addquestion", data);

export const getQuestionById = async (id) => {
  const res = await api.get(`/api/questions/${id}`);
  return res.data;
};

export const updateQuestion = async (id, data) => {
  return await api.put(`/api/questions/${id}`, data);
};

export const deleteQuestion = async (id) => {
  return await api.delete(`/api/questions/${id}`);
};
