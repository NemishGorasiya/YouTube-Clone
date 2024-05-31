import { Box } from "@mui/material";
import VideoGallery from "../../components/VideoGallery";
import { memo } from "react";

const RelatedVideos = memo(({ tags, channelTitle }) => {
  return (
    <Box className="relatedVideos">
      <h2>Related Videos</h2>
      <VideoGallery
        url="/search"
        queryParams={{
          part: "snippet",
          maxResults: 10,
          order: "viewCount",
          q: tags ? tags.slice(0, 3).join(" ") : channelTitle,
          type: "video",
          videoDefinition: "high",
        }}
        isListView={true}
      />
    </Box>
  );
});

RelatedVideos.displayName = "RelatedVideos";

export default RelatedVideos;
