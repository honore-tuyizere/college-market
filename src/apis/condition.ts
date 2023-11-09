import httpClient from "../utils/httpClient";
import { ICondition, IConditionRequest } from "../types";

export const getConditions = async (): Promise<ICondition[]> => {
    return (await httpClient.get(`/conditions`)).data;
};
  
export const getCondition = async (id: string): Promise<ICondition> => {
    return (await httpClient.get(`/conditions/${id}`)).data;
};

export const createCondition = async (data: IConditionRequest): Promise<ICondition> => {
    return (await httpClient.post("/conditions", data)).data;
}

  