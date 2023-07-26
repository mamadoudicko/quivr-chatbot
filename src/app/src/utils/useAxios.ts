import axios, { AxiosError, AxiosInstance } from "axios";

const axiosInstance = axios.create({
  baseURL: `https://api.quivr.app`,
});

export const useAxios = (): { axiosInstance: AxiosInstance } => {

  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer 13ece44ea237e2187aba6e1841019fd5`;

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
