import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/watchVideoPage/Comment";
import { addComment, fetchVideos } from "../../services/services";
import "./CommentsSection.scss";
import SwipeableCommentsSection from "./SwipeableCommentsSection";
import PropTypes from "prop-types";
import useLocalStorage from "../../hooks/useLocalStorage";

const CommentsSection = ({ videoId, channelId }) => {
  const isWideScreen = useMediaQuery("(min-width:1200px)");
  const [comments, setComments] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
  });
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

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

  const handleAddComment = async (event) => {
    event.preventDefault();
    console.log("called");
    const data = new FormData(event.target);
    const comment = data.get("newComment");

    try {
      const queryParams = {
        part: "snippet",
        key: import.meta.env.VITE_GOOGLE_API_KEY,
      };
      const data = {
        snippet: {
          videoId: videoId,
          channelId: channelId,
          topLevelComment: {
            snippet: {
              textOriginal: comment,
            },
          },
        },
      };
      const res = await addComment({ queryParams, data, accessToken });
      if (res) {
        console.log("done comment");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.error(error);
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

  const renderItem = (comment) => (
    <Comment key={comment.id} snippet={comment.snippet} />
  );

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
            <form
              onSubmit={handleAddComment}
              style={{ display: "flex", width: "100%" }}
            >
              <TextField
                id="standard-basic"
                label="Add a comment..."
                variant="standard"
                name="newComment"
                sx={{ flex: "1" }}
              />
              <Button type="submit" variant="contained">
                Comment
              </Button>
            </form>
          </Box>
          <Box className="commentsContainer">
            <InfiniteScroll
              items={list}
              fetchMoreData={loadMoreComments}
              renderItem={renderItem}
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
                renderItem={renderItem}
                isLoading={isLoading}
              ></InfiniteScroll>
            </Box>
          </Box>
        </SwipeableCommentsSection>
      )}
    </>
  );
};

CommentsSection.propTypes = {
  videoId: PropTypes.string,
};

export default CommentsSection;
