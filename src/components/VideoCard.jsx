import MuiCard from "@mui/material/Card";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import MuiCardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import MuiCardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiTypography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
import MuiCardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatDistanceToNow } from "date-fns";
import { formatCompactNumber } from "../utils/utilityFunction";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./VideoCard.scss";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const Card = styled(MuiCard)(({ theme }) => ({
  background: theme.palette.background.default,
}));

const CardMedia = styled(MuiCardMedia)(({ theme, isListView }) => ({
  borderRadius: "14px",
  aspectRatio: "16/9",
  height: "auto",
  ...(isListView ? {} : null),
}));

const CardContent = styled(MuiCardContent)(({ theme, isListView }) => ({
  padding: "8px 0",
  display: "flex",
  gap: "8px",
}));
const ChannelThumbnail = styled("img")(() => ({
  height: "50px",
  width: "50px",
  borderRadius: "50%",
}));

const CardActionArea = styled(MuiCardActionArea)(({ theme, isListView }) => ({
  ...(isListView
    ? {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        placeItems: "start",
        gap: "8px",
      }
    : null),
}));

const VideoTitle = styled(MuiTypography)(({ theme, isListView }) => ({
  lineHeight: "1.2",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  wordBreak: "break-all",
}));

const ChannelName = styled(MuiTypography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.secondary,
}));
const VideoMetadata = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const VideoCard = ({ video, isListView }) => {
  const navigate = useNavigate();
  const { id, snippet, statistics: { viewCount } = {} } = video;
  const {
    publishedAt,
    title,
    channelTitle,
    thumbnails: {
      medium: { url },
    },
    liveBroadcastContent,
  } = snippet || {};

  const handleVideoCardClick = () => {
    navigate(`/watch?v=${id.videoId ?? id}`);
  };

  return (
    <Grid item onClick={handleVideoCardClick}>
      <Card elevation={0} className="videoCard">
        <CardActionArea isListView={isListView}>
          <CardMedia
            isListView={isListView}
            component="img"
            image={url}
            alt="Video Thumbnail"
          />
          <CardContent>
            {!isListView && (
              <ChannelThumbnail
                src="https://placehold.jp/150x150.png"
                alt="Channel Thumbnail"
              />
            )}

            <Box>
              <VideoTitle>{title}</VideoTitle>
              <ChannelName>
                {" "}
                {channelTitle}
                <CheckCircleIcon
                  fontSize="x-small"
                  sx={{ marginLeft: "5px" }}
                />
              </ChannelName>
              <VideoMetadata>
                {liveBroadcastContent === "live" ? (
                  <span className="live">
                    <LiveTvIcon />
                    LIVE
                  </span>
                ) : (
                  `${formatCompactNumber(viewCount || "")}${" views "}`
                )}
                {" • "}
                {formatDistanceToNow(publishedAt, { addSuffix: true })}
              </VideoMetadata>
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
