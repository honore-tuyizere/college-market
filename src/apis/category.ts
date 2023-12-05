import httpClient from "../utils/httpClient";
import {ICategory, ICategoryRequest} from "../types/index";

export const getCategories = async (): Promise<ICategory[]> => {
  return (await httpClient.get(`/categories`)).data;
};

export const createCategory = async (data: ICategoryRequest): Promise<ICategory> => {
  return (await httpClient.post("/categories", data)).data;
}
