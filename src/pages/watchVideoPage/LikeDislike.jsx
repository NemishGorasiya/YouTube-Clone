import { useEffect, useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { formatCompactNumber } from "../../utils/utilityFunction";
import { Divider } from "./WatchVideoPageStyledComponents";
import {
  DislikeButton,
  LikeButton,
  LikeDislikeButtonWrapper,
} from "./LikeDislikeStyledComponents";
import toast from "react-hot-toast";
import { httpRequest } from "../../services/services.js";

const LikeDislike = ({
  isLoggedIn,
  videoId,
  likeCount: likeCountProp,
  isCommentLikeDislike = false,
}) => {
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [rating, setRating] = useState(null);

  const updateRating = async (rating) => {
    if (isCommentLikeDislike) {
      return;
    }
    try {
      const queryParams = {
        id: videoId,
        rating,
      };
      const res = await httpRequest({
        url: "/videos/rate",
        method: "POST",
        queryParams,
        returnEntireResponseWithStatusCode: true,
      });
      if (res.status === 204) {
        let toastMessage;
        switch (rating) {
          case "like":
            toastMessage = "Video liked";
            break;
          case "dislike":
            toastMessage = "Video disliked";
            break;
          default:
            toastMessage = "Video rating removed";
            break;
        }
        toast(toastMessage);
      }
    } catch (error) {
      console.error(error.message || error);
    }
  };

  const rateVideo = async (operation) => {
    const LIKE = "like";
    const DISLIKE = "dislike";

    if (operation === LIKE && rating !== LIKE) {
      updateRating("like");
      setRating(LIKE);
      setLikeCount((prevCount) => String(+prevCount + 1));
    } else if (operation === LIKE && rating === LIKE) {
      updateRating("none");
      setRating(null);
      setLikeCount((prevCount) => String(+prevCount - 1));
    } else if (operation === DISLIKE && rating === LIKE) {
      updateRating("dislike");
      setRating(DISLIKE);
      setLikeCount((prevCount) => String(+prevCount - 1));
    } else if (operation === DISLIKE && rating === DISLIKE) {
      updateRating("none");
      setRating(null);
    } else if (operation === DISLIKE && rating !== DISLIKE) {
      updateRating("dislike");
      setRating(DISLIKE);
    }
  };

  const getRating = useCallback(
    async ({ abortController }) => {
      try {
        const queryParams = {
          id: videoId,
        };
        const res = await httpRequest({
          url: "/videos/getRating",
          queryParams,
          abortController,
        });
        if (res) {
          const { items } = res;
          const { rating } = items.length > 0 ? items[0] : {};
          setRating(rating);
        }
      } catch (error) {
        console.error(error.message || error);
      }
    },
    [videoId]
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (isLoggedIn && !isCommentLikeDislike) {
      getRating({ abortController });
    }
    return () => {
      abortController.abort();
    };
  }, [getRating, isCommentLikeDislike, isLoggedIn]);

  return (
    <LikeDislikeButtonWrapper
      $disabled={!isLoggedIn}
      $isCommentLikeDislike={isCommentLikeDislike}
    >
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
