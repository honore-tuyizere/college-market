import httpClient from "../utils/httpClient";
import { IDonateProductNumber } from "../types/index";

export const getDonateProductsNumber = async () => {
  const { data } = await httpClient.get<IDonateProductNumber>(`/donate-products`);
  console.log(data);

  return data;
};
