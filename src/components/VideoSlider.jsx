import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import VideoCard from "./VideoCard";
import "./VideoSlider.scss";
import { styled } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchPlaylistItems } from "../services/services";
import Loader from "./loader/Loader";
import InfiniteScroll from "./InfiniteScroll";

const SliderTitle = styled(MuiTypography)(() => ({
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "16px",
}));

const RenderItem = ({ video, ref }) => (
  <SwiperSlide
    // key={video.id}
    className="swiperSlide"
    style={{
      width: "310px",
    }}
    ref={ref}
  >
    {/* <VideoCard video={video} /> */}
  </SwiperSlide>
);

const VideoSlider = ({ playlistId }) => {
  const [videos, setVideos] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading, nextPageToken } = videos;

  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const getPlaylistVideos = useCallback(
    async ({ nextPageToken, abortController }) => {
      const queryParams = {
        part: "snippet",
        playlistId,
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        pageToken: nextPageToken,
      };
      try {
        const res = await fetchPlaylistItems({
          queryParams,
          abortController,
          accessToken,
        });
        if (res) {
          const { nextPageToken, items } = res;
          setVideos((prevVideos) => ({
            list: [...prevVideos.list, ...items],
            isLoading: false,
            nextPageToken: nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken, playlistId]
  );

  const loadMorePlaylistVideos = () => {
    if (nextPageToken) {
      getPlaylistVideos({ nextPageToken: nextPageToken });
    }
  };

  useEffect(() => {
    setVideos({
      list: [],
      isLoading: true,
      nextPageToken: "",
    });
    const abortController = new AbortController();
    getPlaylistVideos({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylistVideos]);

  console.log("list", list);
  return (
    <div className="videoSliderWrapper">
      <SliderTitle>For You</SliderTitle>
      {list.length > 0 && (
        <Swiper
          navigation={true}
          spaceBetween={16}
          slidesPerView={"auto"}
          modules={[Navigation]}
          className="swiper"
        >
          <InfiniteScroll
            items={list}
            fetchMoreData={loadMorePlaylistVideos}
            // renderItem={renderItem}
            isLoading={isLoading}
          >
            {list.map((video) => (
              <div>sd</div>
              // <SwiperSlide
              //   key={video.id}
              //   className="swiperSlide"
              //   style={{
              //     width: "310px",
              //   }}
              // >
              // <VideoCard video={video} />
              // </SwiperSlide>
            ))}
          </InfiniteScroll>
        </Swiper>
      )}
    </div>
  );
};

export default VideoSlider;
