import React, { useCallback, useEffect, useState } from "react";
import { fetchComments } from "../../services/services";
import Comment from "./Comment";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CommentReplies = ({ parentId, accessToken, totalReplyCount }) => {
  const [commentReplies, setCommentReplies] = useState({
    list: [],
    isLoading: true,
    nextPageToken: "",
    hasMore: false,
  });
  const [isCommentsRepliesVisible, setIsCommentsRepliesVisible] =
    useState(false);
  const { list, isLoading, nextPageToken, hasMore } = commentReplies;

  const handleReplyCountClick = () => {
    if (isCommentsRepliesVisible) {
      setIsCommentsRepliesVisible(false);
    } else {
      getComments();
      setIsCommentsRepliesVisible(true);
    }
  };
  const getComments = useCallback(
    async ({ nextPageToken } = {}) => {
      try {
        const queryParams = {
          part: "snippet",
          parentId,
          key: import.meta.env.VITE_GOOGLE_API_KEY,
        };
        if (nextPageToken) {
          queryParams.pageToken = nextPageToken;
        }
        const res = await fetchComments({
          queryParams,
          accessToken,
          url: "/comments",
        });
        if (res) {
          setCommentReplies((prevComments) => ({
            list: [...prevComments.list, ...res.items],
            isLoading: false,
            nextPageToken: res.nextPageToken,
            hasMore: res.nextPageToken ? true : false,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [accessToken, parentId]
  );
  const loadMoreCommentReplies = () => {
    if (nextPageToken) {
      getComments({ nextPageToken: nextPageToken });
    }
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleReplyCountClick}
        startIcon={<KeyboardArrowDownIcon />}
      >
        {totalReplyCount} Replies
      </Button>
      {isCommentsRepliesVisible && (
        <>
          {list.map((commentReply) => (
            <Comment
              key={commentReply.id}
              snippet={commentReply.snippet}
              commentId={commentReply.id}
            />
          ))}
          {hasMore && (
            <Button
              variant="text"
              onClick={loadMoreCommentReplies}
              startIcon={<KeyboardArrowDownIcon />}
            >
              Show More Replies
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default CommentReplies;
