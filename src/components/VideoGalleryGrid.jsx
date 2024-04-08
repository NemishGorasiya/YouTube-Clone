import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";

const VideoGalleryGrid = ({ videos }) => {
  return (
    <Grid
      container
      spacing={1.5}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      }}
    >
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </Grid>
  );
};

export default VideoGalleryGrid;
