import VideoSlider from "../../components/VideoSlider";
import VideoGallery from "../../components/VideoGallery";
import { useState } from "react";
import ChannelHomePageContent from "./ChannelHomePageContent";

const ChannelContent = ({ channelId }) => {
  const [currentContentCategory, setCurrentContentCategory] = useState("home");
  return (
    <div className="channelVideosWrapper">
      <div className="tabsWrapper">
        <ul>
          <li
            onClick={() => {
              setCurrentContentCategory("home");
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              setCurrentContentCategory("videos");
            }}
          >
            Videos
          </li>
          <li
            onClick={() => {
              setCurrentContentCategory("playlists");
            }}
          >
            Playlists
          </li>
        </ul>
      </div>
      {currentContentCategory === "home" && (
        <ChannelHomePageContent channelId={channelId} />
      )}
      {currentContentCategory === "videos" && (
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
      )}
      {currentContentCategory === "playlists" && <h1>Playlists</h1>}
    </div>
  );
};

export default ChannelContent;
