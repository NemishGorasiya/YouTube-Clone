import { Box, styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import { useSearchParams } from "react-router-dom";
import PlaylistPanel from "../watchVideoPage/PlaylistPanel";
import { useCallback, useEffect, useState } from "react";
import PlaylistItem from "../watchVideoPage/PlaylistItem";
import { fetchPlaylistItems, fetchPlaylists } from "../../services/services";
import InfiniteScroll from "../../components/InfiniteScroll";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Margin } from "@mui/icons-material";

const PlaylistPageComponent = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "calc(100vh - 56px)",
  overflow: "hidden",
  gap: "8px",
  [theme.breakpoints.down("lg")]: {
    overflowY: "auto",
    flexDirection: "column",
    height: "auto",
  },
}));

const PlaylistSidebar = styled(Box)(({ theme }) => ({
  width: "360px",
  height: "calc(100vh - 56px)",
  borderRadius: 16,
  padding: 24,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  zIndex: 2,
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    overflow: "visible",
    height: "auto",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    gap: "16px",
    maxWidth: "768px",
    margin: "0 auto",
    padding: 12,
  },
}));

const BlurredBackground = styled(Box)(({ theme, playlistThumbnail }) => ({
  position: "absolute",
  backgroundImage: `url(${playlistThumbnail})`,
  filter: "blur(75px)",
  backdropFilter: "blur(5px)",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  right: 0,
  zIndex: -1,
  borderRadius: "inherit",
}));

const PlaylistPanelWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  height: "calc(100vh - 56px)",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "768px",
    margin: "0 auto",
  },
}));

const PlaylistImageWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "16/9",
  borderRadius: 12,
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    maxWidth: "400px",
  },
}));
const PlaylistImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
}));

const PlaylistDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const PlaylistDetailTypography = styled(MuiTypography)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const PlaylistPage = () => {
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get("list");
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const [playlist, setPlaylist] = useState({
    list: [],
    isLoading: true,
  });
  const { list, isLoading } = playlist || {};
  const { snippet, contentDetails, status } = list[0] || {};

  const {
    publishedAt,
    title: playlistTitle,
    description,
    thumbnails,
    channelTitle,
  } = snippet || {};
  const { maxres } = thumbnails || {};
  const { url: playlistThumbnail } = maxres || "";

  const { itemCount } = contentDetails || {};
  const { privacyStatus } = status || {};

  const getPlaylistDetails = useCallback(async () => {
    try {
      const queryParams = {
        part: "snippet,contentDetails,status",
        id: playlistId,
        key: import.meta.env.VITE_GOOGLE_API_KEY,
      };
      const res = await fetchPlaylists({ queryParams, accessToken });
      if (res) {
        const { items } = res;
        setPlaylist({
          list: items,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [accessToken, playlistId]);

  useEffect(() => {
    setPlaylist({
      list: [],
      isLoading: true,
    });
    getPlaylistDetails();
  }, [getPlaylistDetails]);

  return (
    <PlaylistPageComponent>
      <PlaylistSidebar>
        <PlaylistImageWrapper>
          <PlaylistImage src={playlistThumbnail} alt="" />
        </PlaylistImageWrapper>
        <PlaylistDetails>
          <h1>{playlistTitle}</h1>
          <p>{description}</p>
          <p>{channelTitle}</p>
          <p>{itemCount} videos</p>
          <p>{privacyStatus}</p>
        </PlaylistDetails>
        <BlurredBackground playlistThumbnail={playlistThumbnail} />
      </PlaylistSidebar>
      <PlaylistPanelWrapper>
        <PlaylistPanel playlistId={playlistId} />
      </PlaylistPanelWrapper>
    </PlaylistPageComponent>
  );
};

export default PlaylistPage;
