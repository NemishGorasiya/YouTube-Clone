import MuiCard from "@mui/material/Card";
// import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatDistanceToNow } from "date-fns";
import { formatCompactNumber } from "../utils/utilityFunction";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  background: theme.palette.background.default,
}));

const VideoCard = ({ video, isListView }) => {
  const navigate = useNavigate();
  const { id, snippet, statistics: { viewCount } = {} } = video;
  console.log(video);
  const {
    publishedAt,
    title,
    channelTitle,
    thumbnails: {
      medium: { url },
    },
  } = snippet || {};

  const handleVideoCardClick = () => {
    navigate(`/watch?v=${id.videoId ?? id}`);
  };

  return (
    <Grid item onClick={handleVideoCardClick}>
      <Card elevation={0}>
        <CardActionArea
          sx={
            isListView
              ? {
                  display: "flex",
                  gap: 3,
                  justifyContent: "start",
                }
              : null
          }
        >
          <CardMedia
            component="img"
            height={isListView ? "250" : "200"}
            image={url}
            alt="Video Thumbnail"
            sx={{
              borderRadius: "14px",
              ...(isListView
                ? {
                    maxWidth: "400px",
                    width: "50%",
                  }
                : null),
            }}
          />
          <CardContent sx={{ paddingX: 0, alignSelf: "start" }}>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 50,
                  width: 50,
                  borderRadius: "50%",
                }}
                alt="Channel Thumbnail"
                src="https://placehold.jp/150x150.png"
              />
              <Box>
                <Typography
                  sx={{
                    lineHeight: "1.2",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "2",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  }}
                  gutterBottom
                  variant="subtitle1"
                  component="h2"
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {channelTitle}
                  <CheckCircleIcon
                    fontSize="x-small"
                    sx={{ marginLeft: "5px" }}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatCompactNumber(viewCount || "")} views •{" "}
                  {formatDistanceToNow(publishedAt, { addSuffix: true })}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

VideoCard.propTypes = {
  video: PropTypes.object,
  isListView: PropTypes.bool,
};

export default VideoCard;
