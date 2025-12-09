import axios from "./axiosConfig";

export const login = async (credentials) => {
  const res = await axios.post("/users/login", credentials);
  return res.data; // { token, user }
};

export const register = async (payload) => {
  const res = await axios.post("/users/register", payload);
  return res.data; // { message }
};
