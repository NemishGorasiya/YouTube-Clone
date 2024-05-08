import { Box, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { fetchPlaylistItems } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import PlaylistItem from "./PlaylistItem";
import MuiBox from "@mui/material/Box";
import InfiniteScroll from "../../components/InfiniteScroll";

const PlaylistPanel = ({ playlistId }) => {
  const [playlist, setPlaylist] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading, nextPageToken } = playlist;

  const [user, setUser] = useLocalStorage("user", {});
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
      fetchPlaylistItems({ nextPageToken: nextPageToken });
    }
  };
  useEffect(() => {
    const abortController = new AbortController();
    getPlaylistItems({ abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylistItems]);

  const PlaylistPanelComponent = styled(MuiBox)(({ theme }) => ({
    background: theme.palette.background.light,
    borderRadius: "14px",
    padding: "12px",
  }));
  const PlaylistItemsWrapper = styled(MuiBox)(({ theme }) => ({
    maxHeight: "500px",
    overflow: "auto",
  }));

  const renderItem = (playlistItem) => (
    <PlaylistItem key={playlistItem.id} playlistItem={playlistItem} />
  );

  return (
    <PlaylistPanelComponent>
      Watchlist
      <PlaylistItemsWrapper>
        {/* {list.map((playlistItem) => (
          <PlaylistItem key={playlistItem.id} playlistItem={playlistItem} />
        ))} */}
        <InfiniteScroll
          items={list}
          fetchMoreData={loadMorePlaylistItems}
          isLoading={isLoading}
          renderItem={renderItem}
        />
      </PlaylistItemsWrapper>
    </PlaylistPanelComponent>
  );
};

export default PlaylistPanel;
