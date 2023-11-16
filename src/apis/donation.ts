import httpClient from "../utils/httpClient";
import { IDonateProductNumber } from "../types";

export const getDonateProductsNumber = async () => {
  const { data } = await httpClient.get<IDonateProductNumber>(`/donate-products`);
  console.log(data);

  return data;
};
