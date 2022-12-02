import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/api/" : "/",
});

export const authRequest = (endpoint, payload) => {
  return instance.post(endpoint, null, {
    headers: {
      Authorization: `Basic ${payload}`,
    },
  });
};

export const getRequest = (endpoint, params = {}) => {
  return instance.get(endpoint, { params: params });
};

export const postRequest = (endpoint, payload, params = {}) => {
  console.log(typeof params);
  return instance.post(endpoint, payload, { params });
};
export const postRequestwithConf = (endpoint, payload, config) => {
  let requestConf = {};
  switch (typeof config) {
    case "object":
      requestConf = config;
      break;
    case "string":
      requestConf = { params: { config } }; //Hud
      break;
    default:
      requestConf = config;
      break;
  }
  console.log("reached");
  return instance.post(endpoint, payload, requestConf);
};

export const putRequest = (endpoint, payload, params = {}) => {
  return instance.put(endpoint, payload, { params });
};

export const deleteRequest = (endpoint, params = {}) => {
  return instance.delete(endpoint, { params });
};

export default instance;
