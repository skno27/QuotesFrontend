import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// defining the axios interceptor!

console.log("API Base URL:", import.meta.env.VITE_API_URL); // debug

// create the api with the backend url variable in the environment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.defaults.withCredentials = true;

// api request maker configuration
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adding a response interceptor to handle errors globally

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login or refresh token
        console.error("Unauthorized access - go back to login");
        alert("Unauthorized access - go back to login");
      }
      if (error.response.status === 403) {
        // Forbidden access
        console.error(
          "Forbidden - you don't have permission to access this resource"
        );
      }
      console.error(`Error code: ${error.response.status} --`);
    }
    return Promise.reject(error);
  }
);

export default api;
