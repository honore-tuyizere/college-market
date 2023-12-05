import httpClient from "../utils/httpClient";
import { IMessageRequest, IMessage } from "../types/index";

export const getMessage = async (messageId: string): Promise<IMessage> => {
  return (await httpClient.get(`/messages/${messageId}`)).data;
};

export const sendMessage = async (data: IMessageRequest): Promise<IMessage> => {
  return (await httpClient.post(`/messages`, data)).data;
};

export const deleteMessage = async (id: string): Promise<string> => {
  return (await httpClient.delete(`/messages/${id}`)).data;
};

export const updateMessage = async (data: IMessageRequest): Promise<IMessage> => {
  return (await httpClient.put(`/messages/${data._id}`, data)).data;
};
