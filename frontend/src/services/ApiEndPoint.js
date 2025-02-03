import axios from "axios";

const BASE_URL = "http://localhost:3000";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
});

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const del = (url, data) => instance.delete(url, data);
export const put = (url) => instance.put(url);

instance.interceptors.request.use(
  function (config) {

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("interceptor responce", response);
    return response;
  },
  function (error) {
    console.log("interceptor responce", error);
    return Promise.reject(error);
  }
);
