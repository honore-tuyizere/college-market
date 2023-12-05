import { IStatistic } from "../types/index";
import httpClient from "../utils/httpClient";

export const getOverview = async (data: string = ""): Promise<IStatistic> => {
  return (await httpClient.get(`/statistics${data}`)).data;
};
