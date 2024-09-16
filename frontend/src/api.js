import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// const apiUrl = "/choreo-apis/djangoreact001/backend/v1";
const apiUrl = "https://8a93a5d3-0eaf-4298-b4dc-355f55506461-dev.e1-us-cdp-2.choreoapis.dev/djangoreact001/backend/v1.0";

// Import URL from .env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
//   baseURL: apiUrl,
  // baseURL: process.env.VITE_API_URL,
  // ? import.meta.env.VITE_API_URL : apiUrl,
});

// console.log(api.baseURL)
// Find access token inside our local-storage and send to each user-header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // Remember Bearer token in postman
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
