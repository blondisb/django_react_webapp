import axios from "axios"
import { ACCES_TOKEN } from "./constants"

// Import URL from .env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Find access token inside our local-storage and send to each user-header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCES_TOKEN);
        if (token) {
            // Remember Bearer token in postman
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api