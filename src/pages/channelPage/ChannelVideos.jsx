import React from "react";
import VideoSlider from "../../components/VideoSlider";
import VideoGallery from "../../components/VideoGallery";

const ChannelVideos = ({ channelId }) => {
  return (
    <div className="channelVideosWrapper">
      <div className="tabsWrapper">
        <ul>
          <li>Home</li>
          <li>Videos</li>
          <li>Shorts</li>
          <li>Playlists</li>
        </ul>
      </div>
      <VideoSlider />
      <div className="videoGalleryWrapper">
        <VideoGallery
          queryParams={{
            part: "snippet",
            channelId,
            maxResults: 10,
          }}
          url={"/search"}
        />
      </div>
    </div>
  );
};

export default ChannelVideos;
