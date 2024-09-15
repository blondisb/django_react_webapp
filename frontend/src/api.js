import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Import URL from .env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: process.env.VITE_API_URL,
    // ? import.meta.env.VITE_API_URL : apiUrl,
})

// console.log(api.baseURL)
// Find access token inside our local-storage and send to each user-header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            // Remember Bearer token in postman
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;