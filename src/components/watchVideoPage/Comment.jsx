import "./Comment.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentContent from "./CommentContent";
import PropTypes from "prop-types";

import {
  calcDistanceToNow,
  formatCompactNumber,
  handleFallBackImage,
} from "../../utils/utilityFunction";
import { TextField } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
import { replyComment } from "../../services/services";
import { useState } from "react";
import CommentReplies from "./CommentReplies";

const Comment = ({
  snippet,
  totalReplyCount,
  commentId,
  addNewCommentInList,
}) => {
  const [isReplyCommentInputVisible, setIsReplyCommentInputVisible] =
    useState(false);
  const {
    textDisplay,
    authorDisplayName,
    authorProfileImageUrl,
    likeCount,
    publishedAt,
  } = snippet || {};

  const [user] = useLocalStorage("user", {});
  const { accessToken } = user;

  const toggleReplyInputVisibility = () => {
    setIsReplyCommentInputVisible((prevState) => !prevState);
  };

  const handleReplyComment = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const comment = data.get("newComment");

    if (comment === "") {
      return;
    }

    try {
      const queryParams = {
        part: "snippet",
        key: import.meta.env.VITE_GOOGLE_API_KEY,
      };
      const data = {
        snippet: {
          textOriginal: comment,
          parentId: commentId,
        },
      };
      const res = await replyComment({ queryParams, data, accessToken });
      if (res) {
        addNewCommentInList({ newComment: res });
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="comment">
      <Box
        component="img"
        alt="Channel Thumbnail"
        src={authorProfileImageUrl}
        referrerPolicy="no-referrer"
        onError={(event) => {
          handleFallBackImage(event, "https://placehold.co/150x150");
        }}
      ></Box>
      <Box className="commentDetails" style={{ flex: 1 }}>
        <Box className="commentMetadata">
          <Typography
            className="commentAuthorName"
            variant="subtitle1"
            component="span"
          >
            {authorDisplayName}
          </Typography>
          <Typography variant="subtitle1" component="span">
            {calcDistanceToNow({ time: publishedAt })}
          </Typography>
        </Box>
        <CommentContent textDisplay={textDisplay} />
        <Box className="commentEngagement">
          <ThumbUpIcon />
          {formatCompactNumber(likeCount)}
          <ThumbDownIcon />
          <Button variant="text" onClick={toggleReplyInputVisibility}>
            Reply
          </Button>
        </Box>
        {isReplyCommentInputVisible && (
          <form
            onSubmit={handleReplyComment}
            style={{
              display: "flex",
            }}
          >
            <TextField
              label="Add a comment..."
              variant="standard"
              name="newComment"
              sx={{ flex: 1 }}
              autoComplete="off"
            />
            <Button type="submit" variant="contained">
              Reply
            </Button>
          </form>
        )}
        {totalReplyCount > 0 && (
          <CommentReplies
            accessToken={accessToken}
            parentId={commentId}
            totalReplyCount={totalReplyCount}
          />
        )}
      </Box>
    </Box>
  );
};

Comment.propTypes = {
  snippet: PropTypes.object,
};

export default Comment;
