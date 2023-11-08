import httpClient from "../utils/httpClient";
import { IProduct, IProductRequest } from "../types";

export const createProduct = async (data: IProductRequest): Promise<IProduct> => {
  return (await httpClient.post("/products", data)).data;
};

export const getMyProducts = async (): Promise<IProduct[]> => {
  return (await httpClient.get("/products/my-products")).data;
};

export const deleteProduct = async (id: string): Promise<string> => {
  return (await httpClient.delete(`/products/${id}`)).data;
};

export const updateProduct = async (data: IProductRequest): Promise<IProduct> => {
  return (await httpClient.put(`/products/${data.id}`, data)).data;
};
