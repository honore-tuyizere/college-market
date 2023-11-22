import httpClient from "../utils/httpClient";
import { IUser } from "../types";

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await httpClient.get(`/all-users`);
  return response.data;
};

export const banUser = async (userId: string): Promise<IUser> => {
  const response = await httpClient.put(`/all-users/ban/${userId}`);
  return response.data;
};

export const unbanUser = async (userId: string): Promise<IUser> => {
  const response = await httpClient.put(`/all-users/unban/${userId}`);
  return response.data;
};
