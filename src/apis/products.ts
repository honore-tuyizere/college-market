import httpClient from "../utils/httpClient";
import {
  IHomepageProducts,
  IProduct,
  IProductFilter,
  IProductLog,
  IProductRequest,
  ISingleProduct,
} from "../types/index";

export const createProduct = async (data: IProductRequest): Promise<IProduct> => {
  return (await httpClient.post("/products", data)).data;
};

export const getMyProducts = async (): Promise<IProduct[]> => {
  return (await httpClient.get("/products/my-products")).data;
};

export const deleteProduct = async (id: string): Promise<string> => {
  return (await httpClient.delete(`/products/${id}`)).data;
};

export const getProduct = async (id: string): Promise<ISingleProduct> => {
  return (await httpClient.get(`/products/${id}`)).data;
};

export const getProductLogs = async (id: string): Promise<IProductLog[]> => {
  return (await httpClient.get(`/products/${id}/logs`)).data;
};

export const updateProduct = async (data: IProductRequest): Promise<IProduct> => {
  return (await httpClient.put(`/products/${data.id}`, data)).data;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  return (await httpClient.get(`/products`)).data;
};

export const getHomepageProducts = async (): Promise<IHomepageProducts> => {
  return (await httpClient.get(`/products/homepage`)).data;
};

export const filterProducts = async (data: IProductFilter): Promise<IProduct[]> => {
  return (await httpClient.post(`/products/filter`, data)).data;
};

export const getProductsByPurpose = async (slug: string): Promise<IProduct[]> => {
  return (await httpClient.get(`/products/purpose/${slug}`)).data;
};
