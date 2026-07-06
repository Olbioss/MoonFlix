import axios from "axios";
import queryString from "query-string";
import type { ApiError, HttpClient } from "../../types";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001/api/v1/";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params: any) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = `Bearer ${localStorage.getItem("actkn")}`;
  return config;
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw (err.response?.data ?? { message: err.message }) as ApiError;
  },
);

export default privateClient as unknown as HttpClient;
