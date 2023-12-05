import httpClient from "../utils/httpClient";
import { ICollege } from "../types/index";

export const getColleges = async (): Promise<ICollege[]> => {
  return (await httpClient.get(`/colleges`)).data;
};
