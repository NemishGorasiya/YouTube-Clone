import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fetchPlaylistItems } from "../../services/services";
import PlaylistItem from "./PlaylistItem";
import PropTypes from "prop-types";

const PlaylistPanelComponent = styled(MuiBox)(({ theme }) => ({
  padding: "12px",
}));

const PlaylistPanel = ({ playlistId, playlistName }) => {
  const [playlist, setPlaylist] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading, nextPageToken } = playlist;

  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const getPlaylistItems = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      const queryParams = {
        part: "snippet",
        playlistId,
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        pageToken: nextPageToken,
      };
      try {
        const res = await fetchPlaylistItems({
          queryParams,
          accessToken,
          abortController,
        });
        if (res) {
          const { nextPageToken, items } = res;
          setPlaylist((prevChannels) => ({
            list: [...prevChannels.list, ...items],
            isLoading: false,
            nextPageToken: nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error.message ?? error);
      }
    },
    [accessToken, playlistId]
  );

  const loadMorePlaylistItems = () => {
    if (nextPageToken) {
      getPlaylistItems({ nextPageToken: nextPageToken });
    }
  };

  const renderItem = (playlistItem) => (
    <PlaylistItem key={playlistItem.id} playlistItem={playlistItem} />
  );

  useEffect(() => {
    setPlaylist({
      list: [],
      isLoading: true,
      nextPageToken: "",
    });
    const abortController = new AbortController();
    getPlaylistItems({ abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylistItems]);

  return (
    <PlaylistPanelComponent>
      {playlistName}
      <InfiniteScroll
        items={list}
        fetchMoreData={loadMorePlaylistItems}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </PlaylistPanelComponent>
  );
};

PlaylistPanel.propTypes = {
  playlistId: PropTypes.string,
};

export default PlaylistPanel;
