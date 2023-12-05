import httpClient from "../utils/httpClient";
import { IPurpose, IPurposeRequest } from "../types/index";

export const getPurposes = async (): Promise<IPurpose[]> => {
  return (await httpClient.get(`/purpose`)).data;
};

export const getPurpose = async (slug: string): Promise<IPurpose> => {
  return (await httpClient.get(`/purpose/${slug}`)).data;
};

export const createPurpose = async (data: IPurposeRequest): Promise<IPurpose> => {
  return (await httpClient.post("/purpose", data)).data;
};

export const updatePurpose = async (data: IPurposeRequest): Promise<IPurpose> => {
  return (await httpClient.put(`/purpose/${data.id}`, data)).data;
};

export const deletePurpose = async (id: string): Promise<IPurpose> => {
  return (await httpClient.delete(`/purpose/${id}`)).data;
};
