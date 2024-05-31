import { Box, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { httpRequest } from "../../services/services";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { formatCompactNumber } from "../../utils/utilityFunction";
import { Divider } from "./WatchVideoPageStyledComponents";
import useFetch from "../../hooks/useFetch";

const LikeDislike = ({ isLoggedIn, videoId, likeCount: likeCountProp }) => {
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [rating, setRating] = useState(null);

  const rateVideo = async (operation) => {
    if (operation === "like") {
      if (rating === "like") {
        setRating(null);
        setLikeCount((prevCount) => (+prevCount - 1).toString());
      } else if (rating === "dislike") {
        // API call of like
        setRating("like");
        setLikeCount((prevCount) => (+prevCount + 1).toString());
      } else {
        // API call of like
        setRating("like");
        setLikeCount((prevCount) => (+prevCount + 1).toString());
      }
    } else {
      if (rating === "like") {
        // API call of disLike
        setRating("dislike");
        setLikeCount((prevCount) => (+prevCount - 1).toString());
      } else if (rating === "dislike") {
        setRating(null);
      } else {
        // API call of disLike
        setRating("dislike");
      }
    }
  };

  //   const rateVideo = async (operation) => {
  //     const LIKE = "like";
  //     const DISLIKE = "dislike";

  //     if (operation === LIKE && rating !== LIKE) {
  //       // API call to like
  //       setRating(LIKE);
  //       setLikeCount((prevCount) => String(+prevCount + 1));
  //     } else if (operation === LIKE && rating === LIKE) {
  //       // API call to undo like
  //       setRating(null);
  //       setLikeCount((prevCount) => String(+prevCount - 1));
  //     } else if (operation === DISLIKE && rating !== DISLIKE) {
  //       // API call to dislike
  //       setRating(DISLIKE);
  //       setLikeCount((prevCount) => String(+prevCount - 1));
  //     } else if (operation === DISLIKE && rating === DISLIKE) {
  //       // API call to undo dislike
  //       setRating(null);
  //     }
  //   };

  const queryParams = useMemo(
    () => ({
      id: videoId,
    }),
    [videoId]
  );
  const { data, loading, error } = useFetch({
    url: "/videos/getRating",
    queryParams,
  });

  useEffect(() => {
    if (data && data.items && data.items.length > 0) {
      const { rating: ratingFromResponse } = data.items[0];
      setRating(ratingFromResponse);
    }
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 8,
        bgcolor: "background.paper",
        color: "text.secondary",
        "& svg": {
          m: 1,
        },
      }}
    >
      <Button
        sx={{
          p: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          pr: 1,
        }}
        disabled={!isLoggedIn}
        onClick={() => {
          rateVideo("like");
        }}
      >
        {rating === "like" ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        {formatCompactNumber(likeCount)}
      </Button>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Button
        sx={{
          p: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        disabled={!isLoggedIn}
        onClick={() => {
          rateVideo("dislike");
        }}
      >
        {rating === "dislike" ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
      </Button>
    </Box>
  );
};

export default LikeDislike;
