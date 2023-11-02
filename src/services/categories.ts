import { Icategory } from "../types";
import httpClient from "../utils/httpClient";

export const getNavbarCategories = async (): Promise<Icategory[]> => {
  return (await httpClient.get("/categories")).data;
};
