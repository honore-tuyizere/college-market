import httpClient from "../utils/httpClient";
import { INotice, INoticeRequest } from "../types/index";

export const createNotices = async (data: INoticeRequest): Promise<INotice> => {
    return (await httpClient.post("/notices", data)).data;
};

export const getAllNotices = async (): Promise<INotice[]> => {
    return (await httpClient.get(`/notices`)).data;
};

export const getMyNotices = async (): Promise<INotice[]> => {
    return (await httpClient.get(`/notices/user/my-notices`)).data;
};

export const updateNotice = async (data: INoticeRequest): Promise<INotice> => {
    return (await httpClient.put(`/notices/${data.id}`, data)).data;
};

export const deleteNotice = async (id: string): Promise<string> => {
    return (await httpClient.delete(`/notices/${id}`)).data;
};

