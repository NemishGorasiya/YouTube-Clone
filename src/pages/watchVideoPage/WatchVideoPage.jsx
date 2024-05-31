import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Box from "@mui/material/Box";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiDivider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import VideoGallery from "../../components/VideoGallery";
import { httpRequest } from "../../services/services";
import CommentsSection from "./CommentsSection";
import PlaylistPanel from "./PlaylistPanel";
import ScrollToTopButton from "./ScrollToTopButton";
import VideoDescription from "./VideoDescription";

import "./WatchVideoPage.scss";
import {
  calcDistanceToNow,
  formatCompactNumber,
} from "../../utils/utilityFunction";
import useLocalStorage from "../../hooks/useLocalStorage";
import AddToPlaylist from "./AddToPlaylist";
import SubscribeButton from "../../components/SubscribeButton";
import Loader from "../../components/loader/Loader";
import { AuthContext } from "../../context/AuthContext";

const Divider = styled(MuiDivider)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const ChannelLink = styled(Link)(() => ({
  display: "flex",
  gap: "8px",
}));

const VideoMetadataWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "start  ",
  },
}));

const Tag = styled(MuiTypography)(() => ({
  display: "inline-block",
  marginRight: "4px",
  color: "#3EA6FF",
}));

const UserActionButton = styled(MuiButton)(({ theme }) => ({
  background: theme.palette.secondaryBackground.default,
  color: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.secondaryBackground.light,
  },
}));

const PlaylistPanelWrapper = styled(Box)(({ theme }) => ({
  maxHeight: "500px",
  background: theme.palette.background.light,
  padding: 3,
  borderRadius: "12px",
}));

const VideoDescriptionContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.secondary,
  borderRadius: "8px",
  padding: "12px",
}));

const WatchVideoPage = () => {
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useContext(AuthContext);
  const videoId = searchParams.get("v");
  const playlistId = searchParams.get("list");
  const playlistName = searchParams.get("listName");

  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [isVideoDisLiked, setIsVideoDisLiked] = useState(false);

  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const [videoDetails, setVideoDetails] = useState({
    data: {},
    isLoading: true,
  });
  const [channelDetails, setChannelDetails] = useState({
    data: {},
    isLoading: true,
  });

  const { data: channelData, isLoading: isChannelDetailsLoading } =
    channelDetails || {};

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

  const rateVideo = async ({ rating }) => {
    if (rating === "dislike") {
      setIsVideoDisLiked((prevState) => !prevState);
      return;
    }
    if (isVideoLiked && rating === "like") {
      updateLikeCount({ isIncreasing: false });
      setIsVideoLiked(false);
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const queryParams = {
        id: videoId,
        rating,
      };
      const res = await httpRequest({
        url: "/videos/rate",
        method: "POST",
        headers,
        queryParams,
        returnEntireResponseWithStatusCode: true,
      });
      if (res.status === 204) {
        if (rating === "like") {
          if (rating === "like") {
            updateLikeCount({ isIncreasing: true });
            setIsVideoLiked(true);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
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
            isLoading: true,
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
              isLoading: false,
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
    <Box className="videoPageContainer">
      <Box className="videoPageLeftSection">
        <Box className="videoPlayerWrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            // ?autoplay=1&mute=1
            title="YouTube video player"
            allow="fullscreen"
            frameborder="0"
          ></iframe>
          {isLoading || isChannelDetailsLoading ? (
            <Loader />
          ) : (
            <>
              <h2 className="videoTitle">{title}</h2>
              <VideoMetadataWrapper
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 12px",
                  flexWrap: "wrap",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center" }}
                >
                  <ChannelLink to={`/channel/${channelId}`}>
                    <Box
                      component="img"
                      sx={{
                        height: 50,
                        width: 50,
                        borderRadius: "50%",
                      }}
                      alt="Channel Thumbnail"
                      src={url}
                      referrerPolicy="no-referrer"
                    />
                    <Stack>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {channelTitle}
                        <CheckCircleIcon
                          fontSize="x-small"
                          sx={{ marginLeft: "5px" }}
                        />
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {formatCompactNumber(subscriberCount)} subscribers
                      </Typography>
                    </Stack>
                  </ChannelLink>
                  <SubscribeButton channelId={channelId} />
                </Stack>
                <Stack direction="row" spacing={1.5}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 8,
                      bgcolor: "background.paper",
                      color: "text.secondary",
                      "& svg": {
                        m: 1,
                      },
                    }}
                  >
                    <Button
                      sx={{
                        p: 0,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        pr: 1,
                      }}
                      disabled={!isLoggedIn}
                      onClick={() => {
                        rateVideo({ rating: "like" });
                      }}
                    >
                      {isVideoLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                      {formatCompactNumber(likeCount)}
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button
                      sx={{
                        p: 0,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      disabled={!isLoggedIn}
                      onClick={() => {
                        rateVideo({ rating: "dislike" });
                      }}
                    >
                      {isVideoDisLiked ? (
                        <ThumbDownIcon />
                      ) : (
                        <ThumbDownOffAltIcon />
                      )}
                    </Button>
                  </Box>
                  <UserActionButton variant="contained" disabled={!isLoggedIn}>
                    <AddToPlaylist videoId={videoId} />
                  </UserActionButton>
                </Stack>
              </VideoMetadataWrapper>
              <VideoDescriptionContainer>
                <Typography variant="body1">
                  {formatCompactNumber(viewCount)} views{" "}
                  {calcDistanceToNow({ time: publishedAt })}{" "}
                  {tags && tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
                </Typography>
                <VideoDescription description={description} />
              </VideoDescriptionContainer>
            </>
          )}
        </Box>
        <CommentsSection
          commentCount={commentCount}
          videoId={videoId}
          channelId={channelId}
        />
      </Box>
      <Box className="relatedVideosWrapper">
        {playlistId && (
          <PlaylistPanelWrapper>
            {/* {playlistName} */}
            <PlaylistPanel
              playlistId={playlistId}
              playlistName={playlistName}
            />
          </PlaylistPanelWrapper>
        )}
        <Box className="relatedVideos">
          <h2>Related Videos</h2>
          <VideoGallery
            url="/search"
            queryParams={{
              part: "snippet",
              maxResults: 10,
              order: "viewCount",
              q: tags ? tags.slice(0, 3).join(" ") : channelTitle,
              type: "video",
              videoDefinition: "high",
            }}
            isListView={true}
          />
        </Box>
      </Box>
      <ScrollToTopButton />
    </Box>
  );
};

export default WatchVideoPage;
