import instance from "./instance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createMemo = async (memoData) => {
  const response = await instance.post("/api/memo", memoData);
  return response.data;
};

export const getMemos = async () => {
  const response = await instance.get("/api/memo");
  return response.data;
};

export const getMemoById = async (memoId) => {
  const res = await instance.get(`/api/memo/${memoId}`);
  return res.data;
};
