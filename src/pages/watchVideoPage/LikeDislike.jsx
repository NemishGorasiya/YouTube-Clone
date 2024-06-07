import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { formatCompactNumber } from "../../utils/utilityFunction";
import { Divider } from "./WatchVideoPageStyledComponents";
import useFetch from "../../hooks/useFetch";
import {
  DislikeButton,
  LikeButton,
  LikeDislikeButtonWrapper,
} from "./LikeDislikeStyledComponents";

const LikeDislike = ({
  isLoggedIn,
  videoId,
  likeCount: likeCountProp,
  isCommentLikeDislike = false,
}) => {
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [rating, setRating] = useState(null);

  const rateVideo = async (operation) => {
    const LIKE = "like";
    const DISLIKE = "dislike";

    if (operation === LIKE && rating !== LIKE) {
      // API call to like
      setRating(LIKE);
      setLikeCount((prevCount) => String(+prevCount + 1));
    } else if (operation === LIKE && rating === LIKE) {
      // API call to undo like
      setRating(null);
      setLikeCount((prevCount) => String(+prevCount - 1));
    } else if (operation === DISLIKE && rating === LIKE) {
      // API call to dislike
      setRating(DISLIKE);
      setLikeCount((prevCount) => String(+prevCount - 1));
    } else if (operation === DISLIKE && rating === DISLIKE) {
      // API call to undo dislike
      setRating(null);
    } else if (operation === DISLIKE && rating !== DISLIKE) {
      // API call to dislike
      setRating(DISLIKE);
    }
  };

  const queryParams = useMemo(
    () => ({
      id: videoId,
    }),
    [videoId]
  );

  const requestProps = useMemo(
    () => ({
      url: "/videos/getRating",
      queryParams,
      disabled: !isLoggedIn || isCommentLikeDislike,
    }),
    [isCommentLikeDislike, isLoggedIn, queryParams]
  );
  const { data } = useFetch(requestProps);

  useEffect(() => {
    if (data && data.items && data.items.length > 0) {
      const { rating: ratingFromResponse } = data.items[0];
      setRating(ratingFromResponse);
    }
  }, [data]);

  return (
    <LikeDislikeButtonWrapper $isCommentLikeDislike={isCommentLikeDislike}>
      <LikeButton
        disabled={!isLoggedIn}
        onClick={() => {
          rateVideo("like");
        }}
        $isCommentLikeDislike={isCommentLikeDislike}
      >
        {rating === "like" ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        {formatCompactNumber(likeCount)}
      </LikeButton>
      {!isCommentLikeDislike && (
        <Divider orientation="vertical" variant="middle" flexItem />
      )}
      <DislikeButton
        disabled={!isLoggedIn}
        onClick={() => {
          rateVideo("dislike");
        }}
        $isCommentLikeDislike={isCommentLikeDislike}
      >
        {rating === "dislike" ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
      </DislikeButton>
    </LikeDislikeButtonWrapper>
  );
};

LikeDislike.propTypes = {
  isLoggedIn: PropTypes.bool,
  videoId: PropTypes.string,
  likeCount: PropTypes.string,
  isCommentLikeDislike: PropTypes.bool,
};

export default LikeDislike;
