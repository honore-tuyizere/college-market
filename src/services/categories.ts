import { ICategory } from "../types/index";
import httpClient from "../utils/httpClient";

export const getNavbarCategories = async (): Promise<ICategory[]> => {
  return (await httpClient.get("/categories")).data;
};
