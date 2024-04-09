import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import { useAxios } from "../hooks/useAxios";
import axios from "axios";

const VideoGallery = ({ isListView = false }) => {
  // const { response, error, isLoading, fetchMoreData, items } = useAxios({
  //   url: `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&key=${
  //     import.meta.env.VITE_GOOGLE_API_KEY
  //   }`,
  // });

  const renderItem = (video) => (
    <VideoCard key={video.id} video={video} isListView={isListView} />
  );

  const [video, setVideos] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });

  console.log("video", video);

  const fetchData = useCallback(
    async ({
      abortController = new AbortController(),
      token = video.nextPageToken,
    }) => {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&pageToken=${token}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`,
        { signal: abortController.signal }
      );
      if (res) {
        setVideos((prev) => ({
          list: !res.data.items.length
            ? res.data.items
            : [...prev.list, ...res.data.items],
          isLoading: false,
          nextPageToken: res.data.nextPageToken,
        }));
      }
    },
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchData({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  const loadMore = () => {
    if (!video.isLoading && video.nextPageToken) {
      fetchData({ token: video.nextPageToken });
    }
  };

  return video.isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Grid
      container
      spacing={1.5}
      sx={{
        display: "grid",
        ...(isListView
          ? { gridTemplateColumns: "1fr", maxWidth: "1300px", margin: "auto" }
          : { gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }),
      }}
    >
      <InfiniteScroll
        items={video.list}
        fetchMoreData={loadMore}
        renderItem={renderItem}
      ></InfiniteScroll>
    </Grid>
  );
};

export default VideoGallery;
