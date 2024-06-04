import VideoGallery from "../../components/VideoGallery";
import { memo } from "react";
import { RelatedVideosContainer } from "./WatchVideoPageStyledComponents";
import PropTypes from "prop-types";

const RelatedVideos = memo(({ tags, channelTitle }) => {
  return (
    <RelatedVideosContainer>
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
    </RelatedVideosContainer>
  );
});

RelatedVideos.displayName = "RelatedVideos";

RelatedVideos.propTypes = {
  tags: PropTypes.array,
  channelTitle: PropTypes.string,
};

export default RelatedVideos;
