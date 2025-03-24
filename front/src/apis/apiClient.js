import axios from "axios";
import {AUTH_ACCESS_TOKEN} from "../constants/auth.js";

export const apiClient = axios.create()

export function ApiClientSetting() {
    apiClient.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
    apiClient.defaults.headers.common['Content-Type'] = 'application/json'

    apiClient.interceptors.request.use((config) => {
        if (config.url !== "/auth") {
            config.headers.Authorization = `${window.localStorage.getItem(AUTH_ACCESS_TOKEN)}`
        }
        return config;
    });

    apiClient.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                alert("Your login has expired. Please log in again.")
                window.localStorage.removeItem(AUTH_ACCESS_TOKEN)
                window.location.href = "/login"
            } else if (error.message) alert(error.message)
            return Promise.reject(error)
        }
    )
}

export default apiClient;