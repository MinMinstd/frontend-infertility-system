import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7065/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Sử dụng lưu token vào local storage
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  console.log("Sending token:", token);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
