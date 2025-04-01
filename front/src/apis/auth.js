import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async ({ name, email, password }) => {
  const response = await axios.post(`${BASE_URL}/api/auth/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, {
    email,
    password,
  });

  const token = response.data?.data?.accessToken;
  if (token) {
    localStorage.setItem("accessToken", token);
  }

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

export const checkEmailDuplicate = async (email) => {
  const response = await axios.get(
    `${BASE_URL}/api/auth/email?email=${encodeURIComponent(email)}`
  );
  return response.data;
};
