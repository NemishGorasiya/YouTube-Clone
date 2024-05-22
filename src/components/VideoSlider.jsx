import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchPlaylistItems } from "../services/services";
import VideoCard from "./VideoCard";
import "./VideoSlider.scss";
import Loader from "./loader/Loader";

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

  const loadMorePlaylistVideos = useCallback(() => {
    if (nextPageToken) {
      getPlaylistVideos({ nextPageToken: nextPageToken });
    }
  }, [getPlaylistVideos, nextPageToken]);

  useEffect(() => {
    const abortController = new AbortController();
    getPlaylistVideos({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylistVideos]);

  return (
    <div className="videoSliderWrapper">
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          navigation={true}
          spaceBetween={16}
          modules={[Navigation]}
          className="swiper"
          slidesPerView={1}
          watchSlidesProgress
          breakpoints={{
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 16,
            },
          }}
        >
          {list.length &&
            list.map(
              (video, idx) =>
                video?.snippet?.thumbnails?.high && (
                  <SwiperSlide key={video.id} className="swiperSlide">
                    {({ isVisible }) => {
                      if (list.length === idx + 1 && isVisible) {
                        loadMorePlaylistVideos();
                      }
                      return <VideoCard video={video} />;
                    }}
                  </SwiperSlide>
                )
            )}
        </Swiper>
      )}
    </div>
  );
};

VideoSlider.propTypes = {
  playlistId: PropTypes.string,
};

export default VideoSlider;
