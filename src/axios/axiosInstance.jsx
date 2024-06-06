import axios from "axios";

// Get user info from local storage
const getUserInfo = () => JSON.parse(localStorage.getItem("user")) || {};
let { accessToken = "", refreshToken = "" } = getUserInfo();

const axiosInstance = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const refreshAccessToken = async () => {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });

    if (response && response.data) {
      const {
        data: { access_token: newAccessToken },
      } = response;
      const userInfo = getUserInfo();
      const updatedUserInfo = {
        ...userInfo,
        accessToken: newAccessToken,
      };

      localStorage.setItem("user", JSON.stringify(updatedUserInfo));
      accessToken = newAccessToken;

      return newAccessToken;
    }
  } catch (error) {
    console.error("Error refreshing access token", error);
    throw error;
  }
};

const refreshAndRetryQueue = [];
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await refreshAccessToken();

          // Retry all requests in the queue with the new token
          for (const req of refreshAndRetryQueue) {
            req.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            try {
              const response = await axiosInstance.request(req.config);
              req.resolve(response);
            } catch (err) {
              req.reject(err);
            }
          }

          refreshAndRetryQueue.length = 0;
          isRefreshing = false;

          // Retry the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          console.error("Token refresh failed", refreshError);
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      }

      // Add the original request to the queue
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
