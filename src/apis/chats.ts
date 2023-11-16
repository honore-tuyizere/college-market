import httpClient from "../utils/httpClient";
import { IAcceptPrice, IChat, IChatDTO } from "../types";

export const getChat = async (productId: string): Promise<IChatDTO> => {
  return (await httpClient.get(`/chats/${productId}`)).data;
};

export const getMyChats = async (): Promise<IChatDTO[]> => {
  return (await httpClient.get("/chats/my-chats")).data;
};

export const deleteChat = async (id: string): Promise<string> => {
  return (await httpClient.delete(`/chats/${id}`)).data;
};

export const getChatById = async (id: string): Promise<IChatDTO> => {
  return (await httpClient.get(`/chats/${id}/by-id`)).data;
};

export const updateChat = async (data: IAcceptPrice): Promise<IChat> => {
  return (await httpClient.put(`/chats/${data._id}`, data)).data;
};

export const getAllChats = async (): Promise<IChatDTO[]> => {
  return (await httpClient.get(`/chats`)).data;
};
