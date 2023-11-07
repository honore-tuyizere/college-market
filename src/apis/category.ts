import httpClient from "../utils/httpClient";
import { Icategory as ICategory } from "../types";

export const getCategories = async (): Promise<ICategory[]> => {
  return (await httpClient.get(`/categories`)).data;
};
