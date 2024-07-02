import { useEffect, useState, useCallback } from "react";
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
import { videoLikeDislikeMessages } from "../../utils/constant.jsx";

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
        toast(videoLikeDislikeMessages[rating] || "Rating updated");
      }
    } catch (error) {
      console.error(error.message || error);
    }
  };

  const handleLikeDislike = async (event) => {
    const LIKE = "like";
    const DISLIKE = "dislike";

    const type = event.target
      .closest("[data-rating]")
      .getAttribute("data-rating");

    const isLike = type === LIKE;
    const isDislike = type === DISLIKE;

    if (isLike) {
      const newRating = rating === LIKE ? "none" : LIKE;
      setLikeCount((prev) => String(rating === LIKE ? +prev - 1 : +prev + 1));
      setRating(newRating);
      await updateRating(newRating);
    } else if (isDislike) {
      const newRating = rating === DISLIKE ? "none" : DISLIKE;
      setRating(newRating);
      if (rating === LIKE) {
        setLikeCount((prev) => String(+prev - 1));
      }
      await updateRating(newRating);
    }
  };

  const getRating = useCallback(
    async ({ signal }) => {
      try {
        const queryParams = {
          id: videoId,
        };
        const res = await httpRequest({
          url: "/videos/getRating",
          queryParams,
          signal,
        });
        if (res && res.items.length > 0) {
          setRating(res.items[0].rating || null);
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
      getRating({ signal: abortController.signal });
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
        data-rating="like"
        onClick={handleLikeDislike}
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
        data-rating="dislike"
        onClick={handleLikeDislike}
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
