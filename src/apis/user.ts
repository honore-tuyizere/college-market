import { IUser, IUserRequest } from "../types";
import httpClient from "../utils/httpClient";

export const getMyProfile = async (): Promise<IUser> => {
    return (await httpClient.get(`/users/profile`)).data;
};

export const updateUserProfile = async (data: IUserRequest): Promise<IUser> => {
    return (await httpClient.put(`/users/${data.id}`, data)).data;
};
