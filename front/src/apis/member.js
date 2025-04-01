import instance from "./instance";

export const getMember = async () => {
  const res = await instance.get("/api/member");
  return res.data;
};
