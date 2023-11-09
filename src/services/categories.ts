import { ICategory } from "../types";
import httpClient from "../utils/httpClient";

export const getNavbarCategories = async (): Promise<ICategory[]> => {
  return (await httpClient.get("/categories")).data;
};
