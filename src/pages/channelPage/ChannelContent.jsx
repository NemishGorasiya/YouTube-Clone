import VideoSlider from "../../components/VideoSlider";
import VideoGallery from "../../components/VideoGallery";
import { useState } from "react";
import ChannelHomePageContent from "./ChannelHomePageContent";
import Playlists from "../../components/playlists/Playlists";
import { Box, styled } from "@mui/material";

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
            style={{ cursor: "pointer" }}
          >
            Home
          </li>
          <li
            onClick={() => {
              setCurrentContentCategory("videos");
            }}
            style={{ cursor: "pointer" }}
          >
            Videos
          </li>
          <li
            onClick={() => {
              setCurrentContentCategory("playlists");
            }}
            style={{ cursor: "pointer" }}
          >
            Playlists
          </li>
        </ul>
      </div>
      <Box py={2}>
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
        {currentContentCategory === "playlists" && (
          <Playlists channelId={channelId} />
        )}
      </Box>
    </div>
  );
};

export default ChannelContent;
