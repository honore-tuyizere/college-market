import httpClient from "../utils/httpClient";
import { ICollege } from "../types";

export const getColleges = async (): Promise<ICollege[]> => {
  return (await httpClient.get(`/colleges`)).data;
};
