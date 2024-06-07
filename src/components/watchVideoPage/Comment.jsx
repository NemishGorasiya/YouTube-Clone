import CommentContent from "./CommentContent";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CommentSkeleton from "./CommentSkeleton";

import {
  calcDistanceToNow,
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
import LikeDislike from "../../pages/watchVideoPage/LikeDislike";

const Comment = ({ snippet, totalReplyCount, commentId }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [isReplyCommentInputVisible, setIsReplyCommentInputVisible] =
    useState(false);

  const [commentReplies, setCommentReplies] = useState({
    list: [],
    isLoading: false,
    nextPageToken: "",
  });

  const { list: repliesList, isLoading: isRepliesLoading } =
    commentReplies || {};

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
          <LikeDislike
            isLoggedIn={isLoggedIn}
            likeCount={likeCount}
            isCommentLikeDislike={true}
          />
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
            $textColor="#3EA6FF"
            $onHoverBackgroundColor="#263850"
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
      </CommentDetails>
    </CommentComponent>
  );
};

Comment.propTypes = {
  snippet: PropTypes.object,
  totalReplyCount: PropTypes.number,
  commentId: PropTypes.string,
};

const MemoizedComment = memo(Comment, (prevProps, nextProps) => {
  return (
    prevProps.snippet.likeCount === nextProps.snippet.likeCount &&
    prevProps.snippet.textDisplay === nextProps.snippet.textDisplay &&
    prevProps.totalReplyCount === nextProps.totalReplyCount
  );
});

export default MemoizedComment;
