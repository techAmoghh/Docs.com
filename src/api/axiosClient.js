import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // 🔥 Replace if your backend runs elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token automatically if needed
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming you store token here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
