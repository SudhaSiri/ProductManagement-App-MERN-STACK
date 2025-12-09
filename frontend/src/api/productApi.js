import axiosInstance from "./axiosConfig";

// Get all products (authenticated)
export const getAllProducts = async () => {
  const res = await axiosInstance.get("/products/all");
  return res.data.products || [];
};

// Get single product by ID
export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/products/view/${id}`);
  return res.data.product;
};

// Admin-only: Add product
export const addProduct = async (payload) => {
  const res = await axiosInstance.post("/products/add", payload);
  return res.data.product;
};

// Admin-only: Update product
export const updateProduct = async (id, payload) => {
  const res = await axiosInstance.put(`/products/update/${id}`, payload);
  return res.data.product;
};

// Admin-only: Delete product
export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/delete/${id}`);
  return res.data;
};
