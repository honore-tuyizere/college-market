import { IStatistic } from "../types";
import httpClient from "../utils/httpClient";

export const getOverview = async (data: string = ""): Promise<IStatistic> => {
  return (await httpClient.get(`/statistics${data}`)).data;
};
