import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import { fetchPlaylists } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import PlaylistCard from "./PlaylistCard";
import InfiniteScroll from "../InfiniteScroll";

const Playlists = () => {
  const [searchParams] = useSearchParams();
  const [playlists, setPlaylists] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading, nextPageToken } = playlists;
  const listQuery = searchParams.get("list");
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const PlaylistGrid = styled(MuiGrid)(() => ({
    display: "grid",
    gap: 2,
    rowGap: 5,
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    pt: 3,
  }));

  const getPlaylists = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      const queryParams = {
        part: "snippet,contentDetails,status",
        ...(listQuery === "LL"
          ? { id: "LL" }
          : { mine: true, pageToken: nextPageToken }),
      };
      try {
        const res = await fetchPlaylists({
          queryParams,
          accessToken,
          abortController,
        });
        if (res) {
          const { nextPageToken, items } = res;
          setPlaylists((prevPlaylists) => ({
            list: [...prevPlaylists.list, ...items],
            isLoading: false,
            nextPageToken: nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    [accessToken, listQuery]
  );

  const loadMorePlaylists = () => {
    if (nextPageToken) {
      getPlaylists({ nextPageToken: nextPageToken });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    getPlaylists({ abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylists]);

  const renderItem = (playlist) => (
    <PlaylistCard key={playlist.id} playlist={playlist} />
  );

  return (
    <PlaylistGrid
      container
      // sx={{
      //   display: "grid",
      //   gap: 2,
      //   rowGap: 5,
      //   gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
      //   pt: 3,
      // }}
    >
      <InfiniteScroll
        items={list}
        fetchMoreData={loadMorePlaylists}
        renderItem={renderItem}
        isLoading={isLoading}
      ></InfiniteScroll>
    </PlaylistGrid>
  );
};

export default Playlists;
