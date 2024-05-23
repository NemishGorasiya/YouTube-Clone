import React, { useCallback, useEffect, useState } from "react";
import { httpRequest } from "../../services/services";
import Comment from "./Comment";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";

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
          ...(nextPageToken && { pageToken: nextPageToken }),
        };

        const res = await httpRequest({
          url: "/comments",
          queryParams,
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

  useEffect(() => {
    setCommentReplies({
      list: [],
      isLoading: true,
      nextPageToken: "",
      hasMore: false,
    });
  }, [isCommentsRepliesVisible]);

  return (
    <>
      <Button
        variant="text"
        onClick={handleReplyCountClick}
        startIcon={
          isCommentsRepliesVisible ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )
        }
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

CommentReplies.propTypes = {
  parentId: PropTypes.string,
  accessToken: PropTypes.string,
  totalReplyCount: PropTypes.number,
};

export default CommentReplies;
