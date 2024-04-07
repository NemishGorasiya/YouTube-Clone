import React from "react";
import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";

const VideoGalleryGrid = () => {
	return (
		<Grid container spacing={2} padding={2}>
			{Array(8)
				.fill()
				.map(() => (
					<VideoCard />
				))}
		</Grid>
	);
};

export default VideoGalleryGrid;
