import api from "./api";

export const getProducts = async (params?: {
  category?: string;
  search?: string;
}) => {

  const response = await api.get("/products", {
    params
  });

  return response.data;
};

export const getProduct = async (id: string) => {

  const response = await api.get(`/products/${id}`);

  return response.data;
};