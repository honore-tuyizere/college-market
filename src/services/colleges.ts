import { ICollege } from "../types/index";
import httpClient from "../utils/httpClient";

export const getColleges = async (): Promise<ICollege[]> => {
  return (await httpClient.get("/colleges")).data;
};
