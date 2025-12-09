import axiosInstance from "./axiosConfig";

// Admin-only: Get all users
export const getAllUsers = async () => {
  const res = await axiosInstance.get("/users/all");
  return res.data.users || [];
};

// Admin-only: Update user role
export const updateUserRole = async (id, role) => {
  const res = await axiosInstance.put(`/users/update-role/${id}`, { role });
  return res.data.user;
};
