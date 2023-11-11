import httpClient from "../utils/httpClient";
import { INotice, INoticeRequest } from "../types";

export const createNotices = async (data: INoticeRequest): Promise<INotice> => {
    return (await httpClient.post("/notices", data)).data;
};

export const getAllNotices = async (): Promise<INotice[]> => {
    return (await httpClient.get(`/notices`)).data;
};

export const getMyNotices = async (): Promise<INotice[]> => {
    return (await httpClient.get(`/notices/user/my-notices`)).data;
};
