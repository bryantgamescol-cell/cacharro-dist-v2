import api from "./api";

export const getProducts = async (params?: {
  category?: string;
  search?: string;
  brand?: string;
  supplier?: string;
  page?: number;
  limit?: number;
}) => {

  const response = await api.get("/products", {
    params: {
      ...params,
      limit: params?.limit ?? 1000
    }
  });

  return response.data;
};

export const getProduct = async (id: string) => {

  const response = await api.get(`/products/${id}`);

  return response.data;
};