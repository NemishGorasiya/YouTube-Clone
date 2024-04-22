import MuiGrid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import PropTypes from "prop-types";
import { fetchVideos } from "../services/services";
import { styled } from "@mui/material/styles";

const Grid = styled(MuiGrid)(({ isListView }) => ({
  display: "grid",
  ...(isListView
    ? {
        gridTemplateColumns: "1fr",
        maxWidth: "1300px",
        margin: "auto",
      }
    : {
        // gridTemplateColumns: {
        //   md: "repeat(auto-fill, minmax(350px, 1fr))",
        //   sm: "1fr 1fr",
        //   xs: "1fr",
        // },
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "12px",
      }),
}));

const VideoGallery = ({ isListView = false, url }) => {
  const [videos, setVideos] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });

  const videoGalleryRef = useRef(null);

  const fetchData = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      try {
        const response = await fetchVideos({
          nextPageToken: nextPageToken,
          url: url,
          abortController: abortController,
        });
        setVideos((prevVideos) => ({
          list: [...prevVideos.list, ...response.items],
          isLoading: false,
          nextPageToken: response.nextPageToken,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [url]
  );

  const loadMore = () => {
    if (videos.nextPageToken) {
      fetchData({ nextPageToken: videos.nextPageToken });
    }
  };

  useEffect(() => {
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
    <Grid container isListView={isListView} ref={videoGalleryRef}>
      <InfiniteScroll
        containerRef={videoGalleryRef}
        items={videos.list}
        fetchMoreData={loadMore}
        renderItem={renderItem}
      ></InfiniteScroll>
    </Grid>
  );
};

VideoGallery.propTypes = {
  isListView: PropTypes.bool,
  url: PropTypes.string,
};

export default VideoGallery;
