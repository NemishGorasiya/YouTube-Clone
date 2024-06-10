import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { httpRequest } from "../services/services";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./VideoCardSkeleton";
import {
  PlaylistTitleTypography,
  PlaylistTitleWrapper,
  PlaylistViewAllButton,
  PlaylistViewAllButtonWrapperLink,
  StyledSwiper,
  StyledSwiperSlide,
  VideoSliderWrapper,
} from "./VideoSliderStyledComponents";

const VideoSlider = ({ playlistId }) => {
  const [videos, setVideos] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const [playlistTitle, setPlaylistTitle] = useState("");

  const { list, isLoading, nextPageToken } = videos;
  const { snippet: { resourceId: { videoId: firstVideoId = "" } = {} } = {} } =
    list.length > 0 ? list[0] : {};

  const slideToObserve = useRef(null);

  const getPlaylistVideos = useCallback(
    async ({ nextPageToken, abortController } = {}) => {
      const queryParams = {
        part: "snippet,status",
        playlistId,
        pageToken: nextPageToken,
        maxResults: 6,
      };

      try {
        const res = await httpRequest({
          url: "/playlistItems",
          queryParams,
          abortController,
        });
        if (res) {
          const { nextPageToken = "", items = [] } = res || {};
          const filteredItems = items.filter((item) => {
            return item.status.privacyStatus !== "private";
          });
          setVideos((prevVideos) => ({
            list: [...prevVideos.list, ...filteredItems],
            isLoading: false,
            nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [playlistId]
  );

  const getPlaylistDetails = useCallback(
    async ({ abortController } = {}) => {
      const queryParams = {
        part: "snippet",
        id: playlistId,
      };

      try {
        const res = await httpRequest({
          url: "/playlists",
          queryParams,
          abortController,
        });
        if (res) {
          const { items = [] } = res;
          const { snippet: { title: playlistTitle = "" } = {} } =
            items.length > 0 ? items[0] : {};
          setPlaylistTitle(playlistTitle);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [playlistId]
  );

  const loadMorePlaylistVideos = useCallback(() => {
    if (nextPageToken) {
      getPlaylistVideos({ nextPageToken });
    }
  }, [getPlaylistVideos, nextPageToken]);

  useEffect(() => {
    const abortController = new AbortController();
    getPlaylistVideos({ abortController });
    getPlaylistDetails({ abortController });
    return () => {
      abortController.abort();
    };
  }, [getPlaylistDetails, getPlaylistVideos]);

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

  return (
    <VideoSliderWrapper>
      <PlaylistTitleWrapper>
        <PlaylistTitleTypography component="h3">
          {playlistTitle}
        </PlaylistTitleTypography>
        <PlaylistViewAllButtonWrapperLink
          to={`/watch?v=${firstVideoId}&list=${playlistId}&listName=${encodeURIComponent(
            playlistTitle
          )}`}
        >
          <PlaylistViewAllButton variant="text" startIcon={<PlayArrowIcon />}>
            Play all
          </PlaylistViewAllButton>
        </PlaylistViewAllButtonWrapperLink>
      </PlaylistTitleWrapper>
      <StyledSwiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={5}
        breakpointsBase="container"
        breakpoints={{
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          992: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          1024: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
        }}
      >
        {list.map((video, idx) => (
          <StyledSwiperSlide
            key={video.id}
            ref={idx + 6 === list.length ? slideToObserve : null}
          >
            <VideoCard video={video} />
          </StyledSwiperSlide>
        ))}
        {isLoading &&
          Array.from({ length: 12 }).map((_, idx) => (
            <StyledSwiperSlide key={idx}>
              <VideoCardSkeleton />
            </StyledSwiperSlide>
          ))}
      </StyledSwiper>
    </VideoSliderWrapper>
  );
};

VideoSlider.propTypes = {
  playlistId: PropTypes.string.isRequired,
};

export default VideoSlider;
