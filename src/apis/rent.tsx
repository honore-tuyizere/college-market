import httpClient from "../utils/httpClient";
import { IRentProductNumber } from "../types/index";

export const getRentProductsNumber = async () => {
  const { data } = await httpClient.get<IRentProductNumber>(`/rent-products`);
  console.log(data);

  return data;
};
