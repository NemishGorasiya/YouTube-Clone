import MuiGrid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { httpRequest } from "../services/services";
import InfiniteScroll from "./InfiniteScroll";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./VideoCardSkeleton";

const Grid = styled(MuiGrid)(({ theme, isListView }) => ({
  display: "grid",
  gap: "16px",
  ...(isListView
    ? {
        gridTemplateColumns: "1fr",
        maxWidth: "1300px",
        margin: "auto",
        gap: "12px",
      }
    : {
        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
      }),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const VideoGallery = ({
  isListView = false,
  url,
  queryParams: queryParamsProp,
}) => {
  const [videos, setVideos] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });

  const { list, isLoading, nextPageToken } = videos;

  const fetchData = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      try {
        setVideos((prevVideos) => ({
          ...prevVideos,
          isLoading: true,
        }));
        const queryParams = { ...queryParamsProp, pageToken: nextPageToken };
        const response = await httpRequest({
          url: url,
          abortController,
          queryParams,
        });
        if (response) {
          const { items, nextPageToken } = response;
          setVideos((prevVideos) => ({
            list: [...prevVideos.list, ...items],
            isLoading: false,
            nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [queryParamsProp, url]
  );

  const loadMore = () => {
    if (nextPageToken) {
      fetchData({ nextPageToken });
    }
  };

  useEffect(() => {
    setVideos({
      list: [],
      isLoading: true,
      nextPageToken: "",
    });
    const abortController = new AbortController();
    fetchData({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  const renderItem = (video) => (
    <VideoCard key={video.id} video={video} isListView={isListView} />
  );

  return (
    <Grid container isListView={isListView}>
      <InfiniteScroll
        items={list}
        fetchMoreData={loadMore}
        renderItem={renderItem}
        isLoading={true}
        skeletonItem={<VideoCardSkeleton isListView={isListView} />}
        numberOfSkeletonItems={12}
      />
    </Grid>
  );
};

VideoGallery.propTypes = {
  isListView: PropTypes.bool,
  url: PropTypes.string,
  queryParams: PropTypes.object,
};

export default VideoGallery;
