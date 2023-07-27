import axios, { AxiosError, AxiosInstance } from "axios";
import { getSettings } from "../api/settings";

const axiosInstance = axios.create({
  baseURL: `https://api.quivr.app`,
});

export const useAxios = (): { axiosInstance: AxiosInstance } => {

  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers["Authorization"] = `Bearer ${(await getSettings())?.apiKey}`;
      return config;
    },
    (error: AxiosError) => {
      console.error({ error });
      void Promise.reject(error);
    }
  );

  return {
    axiosInstance,
  };
};
