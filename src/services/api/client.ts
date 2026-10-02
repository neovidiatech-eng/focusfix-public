import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for responses to handle errors globally if needed
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // We can add global toast errors here later
    return Promise.reject(error);
  }
);
