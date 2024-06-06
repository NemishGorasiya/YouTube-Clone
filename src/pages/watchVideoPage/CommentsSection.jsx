import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, useMediaQuery } from "@mui/material";
import InfiniteScroll from "../../components/InfiniteScroll";
import MemoizedComment from "../../components/watchVideoPage/Comment";
import SwipeableCommentsSection from "./SwipeableCommentsSection";
import { httpRequest } from "../../services/services";
import { formatCompactNumber } from "../../utils/utilityFunction";
import { AuthContext } from "../../context/AuthContext";
import { commentsAreOffGooglePageLink } from "../../utils/constant";
import CommentSkeleton from "../../components/watchVideoPage/CommentSkeleton";
import {
  AddComment,
  AddCommentForm,
  AddCommentTextField,
  CommentsSectionComponent,
  KnowMoreLink,
  MyProfileImage,
  Typography,
} from "./CommentsSectionStyledComponents";

const CommentsSection = ({ videoId, channelId, commentCount }) => {
  const isWideScreen = useMediaQuery("(min-width:1200px)");

  const { isLoggedIn } = useContext(AuthContext);

  const [comments, setComments] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
    isDisabled: false,
  });

  const { list, isLoading, nextPageToken, isDisabled } = comments;

  const getComments = useCallback(
    async ({ nextPageToken, abortController }) => {
      try {
        const queryParams = {
          part: "snippet",
          videoId: videoId,
          order: "relevance",
          pageToken: nextPageToken,
          returnEntireResponseWithStatusCode: true,
        };

        const response = await httpRequest({
          url: "/commentThreads",
          queryParams,
          abortController: abortController,
        });

        setComments((prevComments) => ({
          ...prevComments,
          list: [...prevComments.list, ...response.items],
          isLoading: false,
          nextPageToken: response.nextPageToken,
        }));
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setComments((prevComments) => ({
            ...prevComments,
            isDisabled: true,
          }));
        } else {
          console.error("Failed to load comments:", error);
        }
      }
    },
    [videoId]
  );

  const loadMoreComments = useCallback(() => {
    if (nextPageToken) {
      getComments({ nextPageToken });
    }
  }, [getComments, nextPageToken]);

  const updateLikeCount = useCallback(({ id, isIncreasing }) => {
    setComments((prevComments) => ({
      ...prevComments,
      list: prevComments.list.map((comment) => {
        if (comment.id === id) {
          const prevLikeCount =
            comment.snippet.topLevelComment.snippet.likeCount;
          const newLikeCount = isIncreasing
            ? (+prevLikeCount + 1).toString()
            : (+prevLikeCount - 1).toString();
          return {
            ...comment,
            snippet: {
              ...comment.snippet,
              topLevelComment: {
                ...comment.snippet.topLevelComment,
                snippet: {
                  ...comment.snippet.topLevelComment.snippet,
                  likeCount: newLikeCount,
                },
              },
            },
          };
        } else {
          return comment;
        }
      }),
    }));
  }, []);

  const handleAddComment = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const comment = data.get("newComment");

    if (comment === "") {
      return;
    }

    try {
      const queryParams = { part: "snippet" };
      const requestData = {
        snippet: {
          videoId: videoId,
          channelId: channelId,
          topLevelComment: {
            snippet: { textOriginal: comment },
          },
        },
      };
      const res = await httpRequest({
        url: "/commentThreads",
        method: "POST",
        queryParams,
        data: requestData,
      });
      if (res) {
        addNewCommentInList({ newComment: res });
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const addNewCommentInList = useCallback(({ newComment }) => {
    setComments((prevComments) => ({
      ...prevComments,
      list: [newComment, ...prevComments.list],
    }));
  }, []);

  useEffect(() => {
    setComments({
      list: [],
      isLoading: true,
      nextPageToken: "",
      isDisabled: false,
    });
    const abortController = new AbortController();
    getComments({ abortController: abortController });
    return () => {
      abortController.abort();
    };
  }, [getComments]);

  const memoizedComments = useMemo(() => list, [list]);

  const renderItem = useCallback(
    (comment) => (
      <MemoizedComment
        key={comment.id}
        snippet={comment.snippet.topLevelComment.snippet}
        commentId={comment.id}
        totalReplyCount={comment.snippet.totalReplyCount}
        updateLikeCount={updateLikeCount}
      />
    ),
    [updateLikeCount]
  );

  if (isDisabled) {
    return (
      <Typography variant="body1">
        Comments are turned off.{" "}
        <KnowMoreLink href={commentsAreOffGooglePageLink} target="_blank">
          Learn more
        </KnowMoreLink>
      </Typography>
    );
  }

  const renderCommentsSection = () => (
    <>
      <AddComment>
        <MyProfileImage
          alt="Channel Thumbnail"
          src="https://placehold.jp/150x150.png"
          referrerPolicy="no-referrer"
        />
        <AddCommentForm onSubmit={handleAddComment}>
          <AddCommentTextField
            label="Add a comment..."
            variant="standard"
            name="newComment"
            autoComplete="off"
            disabled={!isLoggedIn}
          />
          <Button disabled={!isLoggedIn} type="submit" variant="contained">
            Comment
          </Button>
        </AddCommentForm>
      </AddComment>
      <Box>
        <InfiniteScroll
          items={memoizedComments}
          fetchMoreData={loadMoreComments}
          renderItem={renderItem}
          isLoading={isLoading}
          skeletonItem={<CommentSkeleton />}
        />
      </Box>
    </>
  );

  return isWideScreen ? (
    <CommentsSectionComponent>
      <h2>{formatCompactNumber(commentCount)} Comments</h2>
      {renderCommentsSection()}
    </CommentsSectionComponent>
  ) : (
    <SwipeableCommentsSection commentCount={commentCount}>
      <Box>{renderCommentsSection()}</Box>
    </SwipeableCommentsSection>
  );
};

CommentsSection.propTypes = {
  videoId: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
};

export default CommentsSection;
