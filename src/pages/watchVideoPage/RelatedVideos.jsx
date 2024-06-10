import { memo } from "react";
import PropTypes from "prop-types";
import VideoGallery from "../../components/VideoGallery";
import { RelatedVideosContainer } from "./WatchVideoPageStyledComponents";

const RelatedVideos = memo(({ tags, channelTitle }) => {
  return (
    <RelatedVideosContainer>
      <h2>Related Videos</h2>
      <VideoGallery
        url="/search"
        queryParams={{
          part: "snippet",
          maxResults: 20,
          order: "viewCount",
          q: tags ? tags.slice(0, 3).join(" ") : channelTitle,
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
