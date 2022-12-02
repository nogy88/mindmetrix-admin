import api from ".";
import { message } from "antd";

api.interceptors.request.use(async (config) => {
  if (!config.headers["Authorization"]) {
    const data = JSON.parse(localStorage.getItem("data"));
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${data.token}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("data");
      message.info("Токены хугацаа дууссан байна. Дахин нэвтэрнэ үү.");
    }
    return Promise.reject(error.response && error.response.data);
  }
);
