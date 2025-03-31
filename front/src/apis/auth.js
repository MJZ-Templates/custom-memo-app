import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/api/auth/register`, {
    email,
    password,
  });
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${BASE_URL}/api/member`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
