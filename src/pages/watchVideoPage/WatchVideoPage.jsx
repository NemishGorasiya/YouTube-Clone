import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import MuiBox from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiDivider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import VideoGallery from "../../components/VideoGallery";
import { fetchVideos } from "../../services/services";
import CommentsSection from "./CommentsSection";
import PlaylistPanel from "./PlaylistPanel";
import ScrollToTopButton from "./ScrollToTopButton";
import VideoDescription from "./VideoDescription";
import "./WatchVideoPage.scss";
import {
  calcDistanceToNow,
  formatCompactNumber,
} from "../../utils/utilityFunction";

const Divider = styled(MuiDivider)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const ChannelLink = styled(Link)(() => ({
  display: "flex",
  gap: "8px",
}));

const PlaylistPanelWrapper = styled(Box)(({ theme }) => ({
  maxHeight: "500px",
  overflow: "auto",
  background: theme.palette.background.light,
  padding: 3,
  borderRadius: "12px",
}));

const WatchVideoPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const playlistId = searchParams.get("list");
  const playlistName = searchParams.get("listName");
  const [videoDetails, setVideoDetails] = useState({
    data: {},
    isLoading: true,
  });

  const { data, isLoading } = videoDetails;

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

  const fetchVideoDetails = useCallback(
    async ({ abortController }) => {
      try {
        const response = await fetchVideos({
          url: `/videos?part=snippet,statistics&id=${videoId}`,
          abortController: abortController,
        });
        if (response) {
          const { items } = response;
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
            title="YouTube video player"
            allow="fullscreen"
            frameborder="0"
          ></iframe>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <h2 className="videoTitle">{title}</h2>
              <Box
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
                      src="https://placehold.jp/150x150.png"
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
                        1.8M subscribers
                      </Typography>
                    </Stack>
                  </ChannelLink>
                  <Button variant="outlined">Join</Button>
                  <Button variant="contained">Subscribe</Button>
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
                    <Button sx={{ p: 0, borderRadius: 0, pr: 1 }}>
                      <ThumbUpIcon /> {"1.8M"}
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button sx={{ p: 0, borderRadius: 0 }}>
                      <ThumbDownIcon />
                    </Button>
                  </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  background: "#272727",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              >
                <Typography variant="body1">
                  {formatCompactNumber(viewCount)} views{" "}
                  {calcDistanceToNow({ time: publishedAt })} ago #TAG
                </Typography>
                <VideoDescription description={description} />
              </Box>
            </>
          )}
        </Box>
        <CommentsSection videoId={videoId} channelId={channelId} />
      </Box>
      <Box className="relatedVideosWrapper">
        {playlistId && (
          <PlaylistPanelWrapper>
            <PlaylistPanel
              playlistId={playlistId}
              playlistName={playlistName}
            />
          </PlaylistPanelWrapper>
        )}
        {/* <Box className="relatedVideos">
          Related Videos
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
        </Box> */}
      </Box>
      <ScrollToTopButton />
    </Box>
  );
};

export default WatchVideoPage;
