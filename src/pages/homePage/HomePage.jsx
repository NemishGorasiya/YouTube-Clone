import { useContext } from "react";
import VideoGallery from "../../components/VideoGallery.jsx";
import { UserPreferencesContext } from "../../context/UserPreferencesContext.jsx";

const HomePage = () => {
	const { location } = useContext(UserPreferencesContext);
	return (
		<div>
			<VideoGallery
				url="/videos"
				queryParams={{
					part: "snippet,statistics,contentDetails",
					chart: "mostPopular",
					maxResults: 10,
					regionCode: location,
				}}
			/>
		</div>
	);
};

export default HomePage;
