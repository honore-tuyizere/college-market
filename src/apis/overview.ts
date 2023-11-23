import { IStatisticOverview } from "../types";
import httpClient from "../utils/httpClient";

export const getOverview = async (
  data: string = "",
): Promise<IStatisticOverview[]> => {
  return (await httpClient.get(`/statistics${data}`)).data;
};