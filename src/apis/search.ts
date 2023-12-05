import httpClient from "../utils/httpClient";
import { IProduct } from "../types/index";

export const searchProducts = async (searchQuery: string): Promise<IProduct[]> => {
  const response = await httpClient.get(`/search/${searchQuery}`);
  return response.data.products;
}