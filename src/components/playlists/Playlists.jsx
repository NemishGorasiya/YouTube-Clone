import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { httpRequest } from "../../services/services";
import InfiniteScroll from "../InfiniteScroll";
import PlaylistCard from "./PlaylistCard";
import PlaylistCardSkeleton from "./PlaylistCardSkeleton";
import { PlaylistGrid } from "./PlaylistsStyledComponents";

const renderItem = (playlist) => (
  <PlaylistCard key={playlist.id} playlist={playlist} />
);

const Playlists = ({ channelId }) => {
  const [searchParams] = useSearchParams();
  const [playlists, setPlaylists] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading, nextPageToken } = playlists;
  const listQuery = searchParams.get("list");

  const getPlaylists = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      const queryParams = {
        part: "snippet,contentDetails,status",
        maxResults: 20,
        ...(listQuery === "LL"
          ? { id: "LL" }
          : channelId
          ? { channelId, pageToken: nextPageToken }
          : { mine: true, pageToken: nextPageToken }),
      };
      try {
        const res = await httpRequest({
          url: "/playlists",
          queryParams,
          abortController,
        });
        if (res) {
          const { nextPageToken, items } = res;
          setPlaylists((prevPlaylists) => ({
            list: [...prevPlaylists.list, ...items],
            isLoading: false,
            nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error.message || error);
      }
    },
    [channelId, listQuery]
  );

  const loadMorePlaylists = () => {
    if (nextPageToken) {
      getPlaylists({ nextPageToken });
    }
  };

  useEffect(() => {
    setPlaylists({
      list: [],
      isLoading: true,
      nextPageToken: "",
    });
    const abortController = new AbortController();
    getPlaylists({ abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylists]);

  if (!isLoading && list.length === 0) return <h1>No Playlists</h1>;

  return (
    <PlaylistGrid container>
      <InfiniteScroll
        items={list}
        fetchMoreData={loadMorePlaylists}
        renderItem={renderItem}
        isLoading={isLoading}
        skeletonItem={<PlaylistCardSkeleton />}
      />
    </PlaylistGrid>
  );
};

Playlists.propTypes = {
  channelId: PropTypes.string,
};

export default Playlists;
