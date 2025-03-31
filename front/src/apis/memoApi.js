import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const createMemo = (memoData) => {
  return axios.post(`${BASE_URL}/api/memo`, memoData);
};

export const getMemoById = (memoId) => {
  return axios.get(`${BASE_URL}/api/memo/${memoId}`);
};

export const getAllMemos = () => {
  return axios.get(`${BASE_URL}/api/memo`);
};

export const updateMemo = (memoId, updatedData) => {
  return axios.patch(`${BASE_URL}/api/memo/${memoId}`, updatedData);
};

export const deleteMemo = (memoId) => {
  return axios.delete(`${BASE_URL}/api/memo/${memoId}`);
};

export const toggleFavorite = (memoId, currentFavorite) => {
  return axios.patch(`${BASE_URL}/api/memo/${memoId}`, {
    favorite: !currentFavorite,
  });
};
