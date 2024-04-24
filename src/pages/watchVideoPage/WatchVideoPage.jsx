import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiDivider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "../../components/InfiniteScroll";
import VideoGallery from "../../components/VideoGallery";
import Comment from "../../components/watchVideoPage/Comment";
import { fetchVideos } from "../../services/services";
import VideoDescription from "./VideoDescription";
import "./WatchVideoPage.scss";

const Divider = styled(MuiDivider)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const WatchVideoPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [videoDetails, setVideoDetails] = useState({});
  const [comments, setComments] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });

  const {
    list: commentsList,
    isLoading: isCommentsLoading,
    nextPageToken: commentsNextPageToken,
  } = comments;

  const { snippet, statistics } = videoDetails || {};
  const { publishedAt, channelId, title, description, channelTitle, tags } =
    snippet || {};
  const { viewCount, likeCount, commentCount } = statistics || {};

  const fetchVideoDetails = useCallback(
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

  const fetchComments = useCallback(
    async ({ nextPageToken, abortController }) => {
      try {
        setComments((prevComments) => ({
          ...prevComments,
          isLoading: true,
        }));
        const response = await fetchVideos({
          nextPageToken: nextPageToken,
          url: `/commentThreads?part=snippet,replies&videoId=${videoId}`,
          abortController: abortController,
        });
        setComments((prevComments) => ({
          list: [...prevComments.list, ...response.items],
          isLoading: false,
          nextPageToken: response.nextPageToken,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [videoId]
  );

  const loadMoreComments = () => {
    if (comments.nextPageToken) {
      fetchComments({ nextPageToken: comments.nextPageToken });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchVideoDetails({ abortController: abortController });
    fetchComments({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchComments, fetchVideoDetails]);

  return (
    <Box className="videoPageContainer">
      <Box className="videoPageLeftSection">
        <Box className="videoPlayerWrapper">
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
          <Box
            sx={{ background: "#272727", borderRadius: "8px", padding: "8px" }}
          >
            <Typography variant="body1">104k views 3 years ago #TAG</Typography>
            <VideoDescription description={description} />
          </Box>
        </Box>

        <Box className="commentsSection">
          <h1>comments</h1>
          <Box className="addComment">
            <Box
              component="img"
              alt="Channel Thumbnail"
              src="https://placehold.jp/150x150.png"
            ></Box>
            <TextField
              id="standard-basic"
              label="Add a comment..."
              variant="standard"
            />
          </Box>
          <Box className="commentsContainer">
            <InfiniteScroll
              items={commentsList}
              fetchMoreData={loadMoreComments}
              renderItem={(comment) => (
                <Comment key={comment.id} snippet={comment.snippet} />
              )}
              isLoading={isCommentsLoading}
            ></InfiniteScroll>
          </Box>
        </Box>
      </Box>
      <Box className="relatedVideos">
        <VideoGallery
          url={`/search?part=snippet&maxResults=10&order=viewCount&q=${
            tags ? tags[0] : channelTitle
          }&type=video&videoDefinition=high`}
          isListView
        />
      </Box>
    </Box>
  );
};

export default WatchVideoPage;
