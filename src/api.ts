import { IWipersParams } from "./models";
import axios, { AxiosResponse } from "axios";
import { ICarInfo } from "./models";

const BASE_URL = "https://ixora-auto.ru/wipers";

export const api = {
  getBrandsAuto: (): Promise<AxiosResponse<ICarInfo[]>> =>
    axios.get(`${BASE_URL}/auto`),
  getModelsAuto: (id: ICarInfo["id"]): Promise<AxiosResponse<ICarInfo[]>> =>
    axios.get(`${BASE_URL}/model/${id}`),
  getModificationsAuto: (
    id: ICarInfo["id"]
  ): Promise<AxiosResponse<ICarInfo[]>> => axios.get(`${BASE_URL}/modif/${id}`),
  getWipersParamsAuto: (
    id: ICarInfo["id"]
  ): Promise<AxiosResponse<IWipersParams[]>> =>
    axios.get(`${BASE_URL}/param/${id}`),
};
