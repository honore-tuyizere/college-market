import httpClient from "../utils/httpClient";
import {
  IOrder,
  IOrderConfirm,
  IOrderRequest,
  IOrderedProduct,
  IProductReturn,
} from "../types";

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
export const getSellersOrders = async (
  sellerId: string,
): Promise<IOrderedProduct[]> => {
  return (await httpClient.get("/orders/seller/" + sellerId)).data;
};

export const getBuyersOrders = async (
  buyerId: string,
): Promise<IOrderedProduct[]> => {
  return (await httpClient.get("/orders/buyer/" + buyerId)).data;
};

export const getOrderCode = async (orderId: string): Promise<string> => {
  return (await httpClient.get("/orders/code/" + orderId)).data;
};

export const confirmOrderDelivery = async (
  data: IOrderConfirm,
): Promise<IOrderConfirm> => {
  return (await httpClient.post(`/orders/confirm`, data)).data;
};

export const setProductReturned = async (
  data: IProductReturn,
): Promise<IProductReturn> => {
  return (await httpClient.post(`/orders/return`, data)).data;
};
