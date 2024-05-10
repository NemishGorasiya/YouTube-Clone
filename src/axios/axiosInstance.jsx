import axios from "axios";

// const userInfo = JSON.parse(localStorage.getItem("user"));
// const { accessToken } = userInfo;
const axiosInstance = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  // other configurations
});

axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    // config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("call the refresh token api here");
      // Handle 401 error, e.g., redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
