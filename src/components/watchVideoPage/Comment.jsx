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

const Comment = ({ snippet }) => {
  const { topLevelComment } = snippet || {};
  const { snippet: innerSnippet } = topLevelComment || {};
  const {
    textDisplay,
    authorDisplayName,
    authorProfileImageUrl,
    likeCount,
    publishedAt,
  } = innerSnippet || {};

  return (
    <Box className="comment">
      <Box
        component="img"
        alt="Channel Thumbnail"
        src={authorProfileImageUrl}
        onError={(event) => {
          handleFallBackImage(event, "https://placehold.co/150x150");
        }}
      ></Box>
      <Box className="commentDetails">
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
          <Button variant="text">Reply</Button>
        </Box>
      </Box>
    </Box>
  );
};

Comment.propTypes = {
  snippet: PropTypes.object,
};

export default Comment;
