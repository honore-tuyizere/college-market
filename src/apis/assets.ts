import httpClient from "../utils/httpClient";

export const uploadFiles = async (data: FormData): Promise<string[]> => {
  return (await httpClient.post("/assets", data)).data;
};
