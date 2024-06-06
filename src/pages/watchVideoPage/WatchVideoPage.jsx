import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { httpRequest } from "../../services/services";
import { AuthContext } from "../../context/AuthContext";
import {
  calcDistanceToNow,
  formatCompactNumber,
} from "../../utils/utilityFunction";
import CommentsSection from "./CommentsSection";
import PlaylistPanel from "./PlaylistPanel";
import ScrollToTopButton from "./ScrollToTopButton";
import VideoDescription from "./VideoDescription";
import AddToPlaylist from "./AddToPlaylist";
import SubscribeButton from "../../components/SubscribeButton";
import LikeDislike from "./LikeDislike";
import RelatedVideos from "./RelatedVideos";
import {
  ChannelDetailsWrapper,
  ChannelLink,
  ChannelThumbnail,
  ChannelTitleTypography,
  CommentSectionSkeleton,
  PlaylistPanelWrapper,
  RelatedVideosWrapper,
  SubscriberCountTypography,
  Tag,
  UserActionButton,
  VideoDescriptionContainer,
  VideoMetadataWrapper,
  VideoPageContainer,
  VideoPageLeftSection,
  VideoPlayerWrapper,
  YouTubeIframe,
  YouTubeIframeWrapper,
} from "./WatchVideoPageStyledComponents";
import VideoPlayerSkeleton from "./VideoPlayerSkeleton";

const WatchVideoPage = () => {
  const [videoDetails, setVideoDetails] = useState({
    data: {},
    isLoading: true,
  });
  const [channelDetails, setChannelDetails] = useState({
    data: {},
  });

  const { isLoggedIn } = useContext(AuthContext);

  const videoDescriptionRef = useRef(null);

  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const playlistId = searchParams.get("list");
  const playlistName = decodeURIComponent(searchParams.get("listName"));

  const { data: channelData } = channelDetails || {};

  const {
    snippet: { thumbnails: { high: { url = "" } = {} } = {} } = {},
    statistics: { subscriberCount = "" } = {},
  } = channelData || {};
  const { data = {}, isLoading = false } = videoDetails;
  const { snippet, statistics } = data || {};
  const {
    publishedAt = "",
    channelId,
    title,
    description,
    channelTitle,
    tags,
  } = snippet || {};
  const { viewCount, likeCount, commentCount } = statistics || {};

  const updateLikeCount = ({ isIncreasing }) => {
    setVideoDetails((prevVideoDetails) => {
      const prevLikeCount = prevVideoDetails.data.statistics.likeCount;
      let newLikeCount;
      if (isIncreasing) {
        newLikeCount = (+prevLikeCount + 1).toString();
      } else {
        newLikeCount = (+prevLikeCount - 1).toString();
      }
      return {
        ...prevVideoDetails,
        data: {
          ...prevVideoDetails.data,
          statistics: {
            ...prevVideoDetails.data.statistics,
            likeCount: newLikeCount,
          },
        },
      };
    });
  };

  const fetchVideoDetails = useCallback(
    async ({ abortController }) => {
      try {
        const queryParams = {
          part: "snippet,statistics",
          id: videoId,
        };
        const response = await httpRequest({
          url: "/videos",
          queryParams,
          abortController,
        });
        if (response) {
          setChannelDetails({
            data: {},
          });
          const { items = [] } = response;
          const { snippet: { channelId = "" } = {} } = items[0] || {};
          const channelDetails = await httpRequest({
            url: "/channels",
            queryParams: {
              part: "snippet,statistics",
              id: channelId,
            },
          });
          if (channelDetails) {
            const { items } = channelDetails;

            setChannelDetails({
              data: items[0],
            });
          }
          setVideoDetails({
            data: items[0],
            isLoading: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [videoId]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchVideoDetails({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchVideoDetails]);

  return (
    <VideoPageContainer>
      <VideoPageLeftSection>
        {isLoading ? (
          <VideoPlayerSkeleton />
        ) : (
          <VideoPlayerWrapper>
            <YouTubeIframeWrapper>
              <YouTubeIframe
                src={`https://www.youtube.com/embed/${videoId}`}
                // ?autoplay=1&mute=1
                title="YouTube video player"
                allow="fullscreen"
              />
            </YouTubeIframeWrapper>
            <h2>{title}</h2>
            <VideoMetadataWrapper>
              <ChannelDetailsWrapper>
                <ChannelLink to={`/channel/${channelId}`}>
                  <ChannelThumbnail
                    alt="Channel Thumbnail"
                    src={url}
                    referrerPolicy="no-referrer"
                  />
                  <Stack>
                    <ChannelTitleTypography variant="h6" color="text.main">
                      {channelTitle}
                    </ChannelTitleTypography>
                    <SubscriberCountTypography
                      variant="body1"
                      color="text.secondary"
                    >
                      {formatCompactNumber(subscriberCount)} subscribers
                    </SubscriberCountTypography>
                  </Stack>
                </ChannelLink>
                <SubscribeButton channelId={channelId} />
              </ChannelDetailsWrapper>
              <Stack direction="row" spacing={1.5}>
                <LikeDislike
                  isLoggedIn={isLoggedIn}
                  videoId={videoId}
                  likeCount={likeCount}
                  updateLikeCount={updateLikeCount}
                />
                <UserActionButton variant="contained" disabled={!isLoggedIn}>
                  <AddToPlaylist videoId={videoId} />
                </UserActionButton>
              </Stack>
            </VideoMetadataWrapper>
            <VideoDescriptionContainer ref={videoDescriptionRef}>
              <Typography variant="body1">
                {formatCompactNumber(viewCount)} views{" "}
                {calcDistanceToNow({ time: publishedAt })}{" "}
                {tags && tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
              </Typography>
              <VideoDescription
                parentRef={videoDescriptionRef}
                description={description}
              />
            </VideoDescriptionContainer>
          </VideoPlayerWrapper>
        )}

        {isLoading ? (
          <CommentSectionSkeleton
            animation="wave"
            variant="text"
            width="100%"
            height={70}
          />
        ) : (
          <CommentsSection
            commentCount={commentCount}
            videoId={videoId}
            channelId={channelId}
          />
        )}
      </VideoPageLeftSection>
      <RelatedVideosWrapper>
        {playlistId && (
          <PlaylistPanelWrapper>
            <PlaylistPanel
              playlistId={playlistId}
              playlistName={playlistName}
            />
          </PlaylistPanelWrapper>
        )}
        <RelatedVideos tags={tags} channelTitle={channelTitle} />
      </RelatedVideosWrapper>
      <ScrollToTopButton />
    </VideoPageContainer>
  );
};

export default WatchVideoPage;
