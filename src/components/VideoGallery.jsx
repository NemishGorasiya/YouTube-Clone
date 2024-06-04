import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { httpRequest } from "../services/services";
import InfiniteScroll from "./InfiniteScroll";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./VideoCardSkeleton";
import { Grid } from "./VideoGalleryStyledComponents";

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
        isLoading={isLoading}
        skeletonItem={<VideoCardSkeleton isListView={isListView} />}
        numberOfSkeletonItems={15}
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
