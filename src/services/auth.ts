import { IUser } from "../types";
import httpClient from "../utils/httpClient";

export const getProfile = async (token: string): Promise<IUser> => {
  return (
    await httpClient.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
};
