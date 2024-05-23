import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import useLocalStorage from "../../hooks/useLocalStorage";
import { httpRequest } from "../../services/services";
import PlaylistItem from "./PlaylistItem";

const PlaylistPanelComponent = styled(MuiBox)(() => ({
  padding: "0 12px",
  overflow: "auto",
  maxHeight: "100%",

  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    borderRadius: "12px",
  },
  "&::-webkit-scrollbar": {
    width: "12px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    backgroundColor: "#555",
  },
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
        pageToken: nextPageToken,
      };
      try {
        const res = await httpRequest({
          url: "/playlistItems",
          queryParams,
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
    [playlistId]
  );

  const loadMorePlaylistItems = () => {
    if (nextPageToken) {
      getPlaylistItems({ nextPageToken: nextPageToken });
    }
  };

  const filterPlaylist = ({ playlistItemId }) => {
    setPlaylist((prevPlaylist) => {
      const { list } = prevPlaylist;
      const filteredList = list.filter(
        (playlistItem) => playlistItem.id !== playlistItemId
      );
      return {
        ...prevPlaylist,
        list: filteredList,
      };
    });
  };
  const renderItem = (playlistItem) => (
    <PlaylistItem
      key={playlistItem.id}
      playlistItem={playlistItem}
      playlistName={playlistName}
      filterPlaylist={filterPlaylist}
    />
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
      {!isLoading && list.length === 0 && (
        <h1>No videos in this playlist yet</h1>
      )}

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
  playlistName: PropTypes.string,
};

export default PlaylistPanel;
