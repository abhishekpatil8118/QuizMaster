import api from "./axios";

export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data; // IMPORTANT
};

export const register = async (registerData) => {
  const response = await api.post("/register", registerData);
  return response.data;
};
