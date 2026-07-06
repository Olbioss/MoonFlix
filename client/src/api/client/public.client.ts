import axios from "axios";
import queryString from "query-string";
import type { ApiError, HttpClient } from "../../types";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params: any) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw (err.response?.data ?? { message: err.message }) as ApiError;
  },
);

export default publicClient as unknown as HttpClient;
