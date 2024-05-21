import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/watchVideoPage/Comment";
import { addComment, fetchComments } from "../../services/services";
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
    hasMore: false,
  });
  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const { list, isLoading, nextPageToken } = comments;

  const getComments = useCallback(
    async ({ nextPageToken, abortController }) => {
      try {
        const queryParams = {
          part: "snippet",
          videoId: videoId,
          order: "relevance",
          key: import.meta.env.VITE_GOOGLE_API_KEY,
          pageToken: nextPageToken,
        };
        const response = await fetchComments({
          queryParams,
          abortController: abortController,
          accessToken,
          url: "/commentThreads",
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
    [accessToken, videoId]
  );

  const loadMoreComments = () => {
    if (nextPageToken) {
      getComments({ nextPageToken: nextPageToken });
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
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
        addNewCommentInList({ newComment: res });
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNewCommentInList = ({ newComment }) => {
    console.log("called");
    setComments((prevComments) => {
      console.log([newComment, ...prevComments.list]);
      return {
        ...prevComments,
        list: [newComment, ...prevComments.list],
      };
    });
  };

  useEffect(() => {
    setComments({
      list: [],
      isLoading: true,
      nextPageToken: "",
    });
    const abortController = new AbortController();
    getComments({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getComments]);

  const renderItem = (comment) => (
    <Comment
      key={comment.id}
      snippet={comment.snippet.topLevelComment.snippet}
      commentId={comment.id}
      totalReplyCount={comment.snippet.totalReplyCount}
      addNewCommentInList={addNewCommentInList}
    />
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
              referrerPolicy="no-referrer"
            ></Box>
            <form
              onSubmit={handleAddComment}
              style={{ display: "flex", width: "100%" }}
            >
              <TextField
                label="Add a comment..."
                variant="standard"
                name="newComment"
                sx={{ flex: "1" }}
                autoComplete="off"
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
              <form
                onSubmit={handleAddComment}
                style={{ display: "flex", width: "100%" }}
              >
                <TextField
                  label="Add a comment..."
                  variant="standard"
                  name="newComment"
                  sx={{ flex: "1" }}
                  autoComplete="off"
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
        </SwipeableCommentsSection>
      )}
    </>
  );
};

CommentsSection.propTypes = {
  videoId: PropTypes.string,
};

export default CommentsSection;
