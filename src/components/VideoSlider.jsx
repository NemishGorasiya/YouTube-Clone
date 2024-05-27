import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useLocalStorage from "../hooks/useLocalStorage";
import { httpRequest } from "../services/services";
import VideoCard from "./VideoCard";
import Loader from "./loader/Loader";
import "./VideoSlider.scss";
import { Box } from "@mui/material";

const VideoSlider = ({ playlistId }) => {
  const [videos, setVideos] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const { list, isLoading, nextPageToken } = videos;

  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;
  const slideToObserve = useRef(null);

  const getPlaylistVideos = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      const queryParams = {
        part: "snippet",
        playlistId,
        pageToken: nextPageToken,
      };

      try {
        const res = await httpRequest({
          url: "/playlistItems",
          queryParams,
          abortController,
        });
        if (res) {
          const { nextPageToken = "", items = [] } = res || {};
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
    [playlistId]
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

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMorePlaylistVideos();
      }
    }, {});
    const element = slideToObserve.current;
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [isLoading, loadMorePlaylistVideos]);

  return isLoading ? (
    <Loader />
  ) : (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={2}
      breakpointsBase="container"
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
    >
      {list.map((video, idx) => (
        <SwiperSlide
          key={video.id}
          ref={idx + 5 === list.length ? slideToObserve : null}
        >
          <VideoCard video={video} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

VideoSlider.propTypes = {
  playlistId: PropTypes.string.isRequired,
};

export default VideoSlider;
