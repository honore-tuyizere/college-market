import httpClient from "../utils/httpClient";
import { ICondition } from "../types";

export const getConditions = async (): Promise<ICondition[]> => {
    return (await httpClient.get(`/conditions`)).data;
  };
  