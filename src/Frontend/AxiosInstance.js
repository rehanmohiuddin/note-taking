import axios from "axios";

const AxiosInitialize = () => {
  axios.defaults.baseURL = "/api";
  return axios;
};

export const AxiosInstance = AxiosInitialize();
