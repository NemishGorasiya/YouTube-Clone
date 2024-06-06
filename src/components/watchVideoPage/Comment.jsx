import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentContent from "./CommentContent";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import CommentSkeleton from "./CommentSkeleton";

import {
  calcDistanceToNow,
  formatCompactNumber,
  handleFallBackImage,
} from "../../utils/utilityFunction";
import { httpRequest } from "../../services/services";
import { Fragment, memo, useCallback, useContext, useState } from "react";
import CommentReplies from "./CommentReplies";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  CommentAuthorImage,
  CommentAuthorName,
  CommentComponent,
  CommentDetails,
  CommentEngagement,
  CommentMetadata,
  CommentPublishTime,
  ReplyCommentForm,
  ReplyTextField,
} from "./CommentsStyledComponents";

const Comment = ({ snippet, totalReplyCount, commentId, updateLikeCount }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [isReplyCommentInputVisible, setIsReplyCommentInputVisible] =
    useState(false);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [isVideoDisLiked, setIsVideoDisLiked] = useState(false);

  const [commentReplies, setCommentReplies] = useState({
    list: [],
    isLoading: false,
    nextPageToken: "",
  });

  const {
    list: repliesList,
    isLoading: isRepliesLoading,
    // nextPageToken,
  } = commentReplies || {};

  const {
    textDisplay,
    authorDisplayName,
    authorProfileImageUrl,
    likeCount,
    publishedAt,
  } = snippet || {};

  const toggleReplyInputVisibility = () => {
    setIsReplyCommentInputVisible((prevState) => !prevState);
  };

  const handleReplyCountButtonClick = () => {
    if (repliesList.length === 0) {
      getComments();
    }
    setIsRepliesVisible((prev) => !prev);
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
      };
      const requestData = {
        snippet: {
          textOriginal: comment,
          parentId: commentId,
        },
      };
      const res = await httpRequest({
        url: "/comments",
        method: "POST",
        queryParams,
        data: requestData,
      });
      if (res) {
        setCommentReplies((prev) => ({
          ...prev,
          list: [res, ...prev.list],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeComment = useCallback(() => {
    setIsVideoLiked((prevState) => {
      const newLikeCount = !prevState;
      updateLikeCount({ id: commentId, isIncreasing: newLikeCount });
      return newLikeCount;
    });
  }, [commentId, updateLikeCount]);

  const handleDisLikeComment = () => {
    setIsVideoDisLiked((prevState) => !prevState);
  };

  const getComments = useCallback(
    async ({ nextPageToken } = {}) => {
      setCommentReplies((prevComments) => ({
        ...prevComments,
        isLoading: true,
      }));
      try {
        const queryParams = {
          part: "snippet",
          parentId: commentId,
          ...(nextPageToken && { pageToken: nextPageToken }),
        };

        const res = await httpRequest({
          url: "/comments",
          queryParams,
        });

        if (res) {
          const { items = [], nextPageToken = "" } = res;
          setCommentReplies((prevComments) => ({
            list: [...prevComments.list, ...items],
            isLoading: false,
            nextPageToken: nextPageToken,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [commentId]
  );

  // const loadMoreCommentReplies = () => {
  //   if (nextPageToken) {
  //     getComments({ nextPageToken: nextPageToken });
  //   }
  // };

  return (
    <CommentComponent>
      <CommentAuthorImage
        alt="Channel Thumbnail"
        src={authorProfileImageUrl}
        referrerPolicy="no-referrer"
        onError={(event) => {
          handleFallBackImage(event, "https://placehold.co/150x150");
        }}
      />
      <CommentDetails>
        <CommentMetadata className="commentMetadata">
          <CommentAuthorName variant="subtitle1">
            {authorDisplayName}
          </CommentAuthorName>
          <CommentPublishTime variant="subtitle2">
            {calcDistanceToNow({ time: publishedAt })}
          </CommentPublishTime>
        </CommentMetadata>
        <CommentContent textDisplay={textDisplay} />
        <CommentEngagement className="commentEngagement">
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleLikeComment}
          >
            {isVideoLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
          </Box>
          {formatCompactNumber(likeCount)}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleDisLikeComment}
          >
            {isVideoDisLiked ? (
              <ThumbDownIcon />
            ) : (
              <ThumbDownOffAltIcon sx={{ height: "fit-content" }} />
            )}
          </Box>
          <Button
            disabled={!isLoggedIn}
            variant="text"
            onClick={toggleReplyInputVisibility}
          >
            Reply
          </Button>
        </CommentEngagement>
        {isReplyCommentInputVisible && (
          <ReplyCommentForm onSubmit={handleReplyComment}>
            <ReplyTextField
              label="Add a reply..."
              variant="standard"
              name="newComment"
              autoComplete="off"
            />
            <Button type="submit" variant="contained">
              Reply
            </Button>
          </ReplyCommentForm>
        )}
        {totalReplyCount > 0 && (
          <Button
            variant="text"
            onClick={handleReplyCountButtonClick}
            textColor="#3EA6FF"
            onHoverBackgroundColor="#263850"
          >
            {isRepliesVisible ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
            {totalReplyCount <= 20 ? totalReplyCount : "20"} Replies
          </Button>
        )}
        {isRepliesVisible &&
          (isRepliesLoading ? (
            Array.from({ length: 10 }).map((_, idx) => (
              <Fragment key={idx}>
                <CommentSkeleton />
              </Fragment>
            ))
          ) : (
            <CommentReplies list={repliesList} />
          ))}

        {/* {nextPageToken && isRepliesVisible && (
          <Button
            variant="text"
            onClick={loadMoreCommentReplies}
            startIcon={<SubdirectoryArrowRightIcon />}
            textColor="#3EA6FF"
            onHoverBackgroundColor="#263850"
          >
            Show More Replies
          </Button>
        )} */}
      </CommentDetails>
    </CommentComponent>
  );
};

Comment.propTypes = {
  snippet: PropTypes.object,
  totalReplyCount: PropTypes.number,
  commentId: PropTypes.string,
  updateLikeCount: PropTypes.func.isRequired,
};

const MemoizedComment = memo(Comment, (prevProps, nextProps) => {
  return (
    prevProps.snippet.likeCount === nextProps.snippet.likeCount &&
    prevProps.snippet.textDisplay === nextProps.snippet.textDisplay &&
    prevProps.totalReplyCount === nextProps.totalReplyCount
  );
});

export default MemoizedComment;
