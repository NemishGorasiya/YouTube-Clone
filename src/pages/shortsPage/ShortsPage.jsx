import { useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";

const ShortsPage = () => {
	const fetchUserData = async () => {
		try {
			const response = await axiosInstance.get(
				`/search?part=snippet&q=GoogleDevelopers&type=playlist&key=${
					import.meta.env.VITE_GOOGLE_API_KEY
				}`
			);
			console.log("User Data:", response.data);
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		fetchUserData();
	}, []);
	return <div>ShortsPage</div>;
};

export default ShortsPage;
