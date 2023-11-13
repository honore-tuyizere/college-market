import httpClient from "../utils/httpClient";
import { IOrder, IOrderRequest } from "../types";

export const createOrder = async (data: IOrderRequest): Promise<string> => {
  return (await httpClient.post("/orders", data)).data;
};

export const getMyOrders = async (): Promise<IOrder[]> => {
  return (await httpClient.get("/orders/my-orders")).data;
};

export const deleteOrder = async (id: string): Promise<string> => {
  return (await httpClient.delete(`/orders/${id}`)).data;
};

export const getOrder = async (id: string): Promise<IOrder> => {
  return (await httpClient.get(`/orders/${id}`)).data;
};

export const updateOrder = async (data: IOrderRequest): Promise<IOrder> => {
  return (await httpClient.put(`/orders/${data.id}`, data)).data;
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  return (await httpClient.get(`/orders`)).data;
};
