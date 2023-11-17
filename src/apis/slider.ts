import httpClient from "../utils/httpClient";
import { ISlider, ISliderRequest } from "../types";

export const createSliders = async (data: ISliderRequest): Promise<ISlider> => {
    return (await httpClient.post("/sliders", data)).data;
};

export const getAllAdsSliders = async (): Promise<ISlider[]> => {
    return (await httpClient.get(`/sliders/type/ads`)).data;
};

export const getAllHeroSliders = async (): Promise<ISlider[]> => {
    return (await httpClient.get(`/sliders/type/hero`)).data;
};

export const getMySliders = async (): Promise<ISlider[]> => {
    return (await httpClient.get(`/sliders/user/my-sliders`)).data;
};

export const updateSliderStatus = async (data: ISliderRequest): Promise<ISlider> => {
    return (await httpClient.put(`/sliders/${data.id}`, data)).data;
};