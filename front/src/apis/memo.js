import instance from "./instance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createMemo = async (memoData) => {
  const response = await instance.post("/api/memo", memoData);
  return response.data;
};
