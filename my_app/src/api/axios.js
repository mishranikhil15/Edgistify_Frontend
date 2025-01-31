import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3600/api", 
});

export default axiosInstance;
