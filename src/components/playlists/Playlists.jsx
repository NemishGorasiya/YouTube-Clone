import WatchLater from "../watchLaterPage/WatchLater";
import Liked from "../liked/Liked";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import InfiniteScroll from "../InfiniteScroll";
import { fetchPlaylists } from "../../services/services";
import useLocalStorage from "../../hooks/useLocalStorage";
import PlaylistCard from "./PlaylistCard";

const Playlists = () => {
  const [searchParams] = useSearchParams();
  const [playlists, setPlaylists] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading, nextPageToken } = playlists;
  const listQuery = searchParams.get("list");
  const [user, setUser] = useLocalStorage("user", {});
  const { accessToken } = user;

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

  const loadMore = () => {
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

  console.log("query", listQuery);
  return (
    <Grid
      container
      sx={{
        display: "grid",
        gap: 2,
        rowGap: 5,
        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        pt: 3,
      }}
    >
      {list.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </Grid>
  );
};

export default Playlists;
