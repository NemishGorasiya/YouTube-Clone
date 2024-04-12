import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./WatchVideoPage.scss";
import { useCallback, useEffect, useState } from "react";
import { fetchVideos } from "../../services/services";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatCompactNumber } from "../../utils/utilityFunction";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyIcon from "@mui/icons-material/Reply";
import DownloadIcon from "@mui/icons-material/Download";
import Stack from "@mui/material/Stack";
import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import VideoGallery from "../../components/VideoGallery";
import VideoDescription from "./VideoDescription";

const Divider = styled(MuiDivider)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const WatchVideoPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [videoDetails, setVideoDetails] = useState({});
  const [relatedVideos, setRelatedVideos] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });

  const { snippet, statistics } = videoDetails || {};
  const { publishedAt, channelId, title, description, channelTitle, tags } =
    snippet || {};
  const { viewCount, likeCount, commentCount } = statistics || {};

  const fetchVideo = useCallback(
    async ({ abortController }) => {
      try {
        const response = await fetchVideos({
          url: `/videos?part=snippet,statistics&id=${videoId}`,
          abortController: abortController,
        });
        const { items } = response;
        setVideoDetails(items[0]);
      } catch (error) {
        console.error(error);
      }
    },
    [videoId]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchVideo({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchVideo]);

  return (
    <Box className="videoPageContainer">
      <Box
        className="videoPlayerWrapper"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="fullscreen"
        ></iframe>
        <h2 className="videoTitle">{title}</h2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 12px",
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
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
            <Button variant="outlined">Join</Button>
            <Button variant="contained">Subscribe</Button>
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<ThumbUpIcon />}
              endIcon={<ThumbDownIcon />}
            >
              {likeCount}
              <Divider orientation="vertical" />
            </Button>
            <Button
              variant="outlined"
              startIcon={<ReplyIcon sx={{ transform: "rotateY(180deg)" }} />}
            >
              Share
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Download
            </Button>
          </Stack>
        </Box>
        <Box sx={{ background: "grey", borderRadius: "8px", padding: "8px" }}>
          <Typography variant="body1">104k views 3 years ago #TAG</Typography>
          <VideoDescription description={description} />
        </Box>
      </Box>
      <Box className="relatedVideos" sx={{ padding: "0 12px" }}>
        {tags && tags[0] && (
          <VideoGallery
            url={`/search?part=snippet&maxResults=10&order=viewCount&q=${tags[0]}&type=video&videoDefinition=high`}
            isListView
          />
        )}
      </Box>
      <Box>
        <Box className="comments">
          <h1>Comments</h1>
        </Box>
      </Box>
    </Box>
  );
};

export default WatchVideoPage;
