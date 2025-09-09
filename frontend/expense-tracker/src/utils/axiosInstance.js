import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URL,    // Ensure this matches your backend server URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
    (error) => {
        return Promise.reject(error);
    }
);

//Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
            // window.location.href = "/login"; // Redirect to login on 401
        }   else if (error.response.status === 403) {
            alert("You do not have permission to perform this action.");
        }   else if (error.response.status === 500) {
            alert("A server error occurred. Please try again later.");
        }   else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
            alert("Network error or request timed out. Please check your connection and try again.");
        }
    }
        return Promise.reject(error);
    }
);
export default axiosInstance;
