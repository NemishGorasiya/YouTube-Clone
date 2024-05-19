import axios from "axios";

const userInfo = JSON.parse(localStorage.getItem("user"));
let { accessToken = "", refreshToken = "" } = userInfo || {};

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

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log("call the refresh token api here");
//       // Handle 401 error, e.g., redirect to login or refresh token
//     }
//     return Promise.reject(error);
//   }
// );

const refreshAccessToken = async () => {
	try {
		const response = await axios.post("https://oauth2.googleapis.com/token", {
			client_id: import.meta.env.VITE_CLIENT_ID,
			client_secret: import.meta.env.VITE_CLIENT_SECRET,
			refresh_token: refreshToken,
			grant_type: "refresh_token",
		});
		accessToken = response.data.accessToken;
		refreshToken = response.data.refreshToken;
		const userInfo = JSON.parse(localStorage.getItem("user"));
		const updatedUserInfo = { ...userInfo, accessToken, refreshToken };
		localStorage.setItem("user", JSON.stringify(updatedUserInfo));
		return accessToken;
	} catch (error) {
		alert("You need to login first");
		console.error("Error refreshing access token", error);
		throw error;
	}
};

axiosInstance.interceptors.response.use(
	(response) => response
	// async (error) => {
	//   const originalRequest = error.config;
	//   if (
	//     error.response &&
	//     error.response.status === 401 &&
	//     !originalRequest._retry
	//   ) {
	//     originalRequest._retry = true;
	//     try {
	//       const newAccessToken = await refreshAccessToken();
	//       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
	//       return axiosInstance(originalRequest);
	//     } catch (refreshError) {
	//       return Promise.reject(refreshError);
	//     }
	//   }
	//   return Promise.reject(error);
	// }
);

export default axiosInstance;
