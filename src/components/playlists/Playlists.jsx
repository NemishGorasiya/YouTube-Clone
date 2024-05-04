import WatchLater from "../watchLaterPage/WatchLater";
import Liked from "../liked/Liked";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

  const getPlaylists = async ({ nextPageToken, abortController } = {}) => {
    const queryParam = {
      part: "snippet",
      mine: true,
      pageToken: nextPageToken,
    };
    try {
      const res = await fetchPlaylists({ queryParam, abortController });
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
  };

  const loadMore = () => {
    if (nextPageToken) {
      getPlaylists({ nextPageToken: nextPageToken });
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  console.log("query", listQuery);
  return listQuery === null ? (
    <>
      {/* <WatchLater />
      <Liked /> */}
      <Grid
        container
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          pt: 3,
        }}
      >
        {Array(10)
          .fill()
          .map((_, idx) => (
            <PlaylistCard key={idx} />
          ))}
      </Grid>
    </>
  ) : listQuery === "WL" ? (
    <WatchLater />
  ) : listQuery === "LL" ? (
    <Liked />
  ) : null;
};

export default Playlists;
