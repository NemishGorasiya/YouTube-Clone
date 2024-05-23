import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/watchVideoPage/Comment";
import { httpRequest } from "../../services/services";
import "./CommentsSection.scss";
import SwipeableCommentsSection from "./SwipeableCommentsSection";
import PropTypes from "prop-types";
import useLocalStorage from "../../hooks/useLocalStorage";
import { formatCompactNumber } from "../../utils/utilityFunction";
import { AuthContext } from "../../context/AuthContext";

const CommentsSection = ({ videoId, channelId, commentCount }) => {
  const isWideScreen = useMediaQuery("(min-width:1200px)");
  const { isLoggedIn } = useContext(AuthContext);
  const [comments, setComments] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
    hasMore: false,
  });

  const { list, isLoading, nextPageToken } = comments;

  const getComments = useCallback(
    async ({ nextPageToken, abortController }) => {
      try {
        const queryParams = {
          part: "snippet",
          videoId: videoId,
          order: "relevance",
          pageToken: nextPageToken,
        };

        const response = await httpRequest({
          url: "/commentThreads",
          queryParams,
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
      getComments({ nextPageToken: nextPageToken });
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const comment = data.get("newComment");

    if (comment === "") {
      return;
    }

    try {
      const queryParams = {
        part: "snippet",
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
      const res = await httpRequest({
        url: "/commentThreads",
        method: "POST",
        queryParams,
        data,
      });
      if (res) {
        addNewCommentInList({ newComment: res });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNewCommentInList = ({ newComment }) => {
    setComments((prevComments) => {
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
          <h1>{formatCompactNumber(commentCount)} Comments</h1>
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
                disabled={!isLoggedIn}
              />
              <Button disabled={!isLoggedIn} type="submit" variant="contained">
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
        <SwipeableCommentsSection commentCount={commentCount}>
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
                  disabled={!isLoggedIn}
                />
                <Button
                  disabled={!isLoggedIn}
                  type="submit"
                  variant="contained"
                >
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
  channelId: PropTypes.string,
};

export default CommentsSection;
