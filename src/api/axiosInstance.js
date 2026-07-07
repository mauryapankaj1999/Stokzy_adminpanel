// import axios from "axios";
// import { BASE_URL } from "../constants/baseurl";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// export default axiosInstance;


import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export default axiosInstance;