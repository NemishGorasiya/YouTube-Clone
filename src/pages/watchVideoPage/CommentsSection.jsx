import {
  Box,
  Button,
  SwipeableDrawer,
  TextField,
  useMediaQuery,
} from "@mui/material";
import "./CommentsSection.scss";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/watchVideoPage/Comment";
import SwipeableCommentsSection from "./SwipeableCommentsSection";
import { useCallback, useEffect, useState } from "react";
import { fetchVideos } from "../../services/services";

const CommentsSection = ({ videoId }) => {
  const isWideScreen = useMediaQuery("(min-width:1200px)");
  const [comments, setComments] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });

  console.log("videoId in comment", videoId);

  const { list, isLoading, nextPageToken } = comments;

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
    if (nextPageToken) {
      fetchComments({ nextPageToken: nextPageToken });
    }
  };

  useEffect(() => {
    setComments({
      list: [],
      isLoading: true,
      nextPageToken: "",
    });
    const abortController = new AbortController();
    fetchComments({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [fetchComments]);

  return (
    <>
      {isWideScreen ? (
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
              items={list}
              fetchMoreData={loadMoreComments}
              renderItem={(comment) => (
                <Comment key={comment.id} snippet={comment.snippet} />
              )}
              isLoading={isLoading}
            ></InfiniteScroll>
          </Box>
        </Box>
      ) : (
        <SwipeableCommentsSection>
          <Box className="commentsSection">
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
                items={list}
                fetchMoreData={loadMoreComments}
                renderItem={(comment) => (
                  <Comment key={comment.id} snippet={comment.snippet} />
                )}
                isLoading={isLoading}
              ></InfiniteScroll>
            </Box>
          </Box>
        </SwipeableCommentsSection>
      )}
    </>
  );
};

export default CommentsSection;
