import { Box, styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const VideoImageWrapper = styled(MuiBox)(({ theme }) => ({
  width: "140px",
  aspectRatio: "16/9",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
  },
}));

const VideoImage = styled("img")(() => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "8px",
}));

const PlaylistItemComponent = styled(MuiBox)(() => ({
  display: "flex",
  gap: "12px",
}));

const VideoTitle = styled(MuiTypography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const ChannelName = styled(MuiTypography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: theme.palette.primary.light,
  fontSize: "14px",
}));

const PlaylistItem = ({ playlistItem }) => {
  const {
    snippet: {
      title,
      playlistId,
      resourceId: { videoId },
      thumbnails: {
        high: { url },
      },
      videoOwnerChannelTitle,
    },
  } = playlistItem;

  return (
    <Link to={`/watch?v=${videoId}&list=${playlistId}`}>
      <PlaylistItemComponent>
        <VideoImageWrapper>
          <VideoImage src={url} alt="Video Thumbnail" />
        </VideoImageWrapper>
        <Box sx={{ flex: 1 }}>
          <VideoTitle>{title}</VideoTitle>
          <ChannelName>{videoOwnerChannelTitle}</ChannelName>
        </Box>
      </PlaylistItemComponent>
    </Link>
  );
};

PlaylistItem.propTypes = {
  playlistItem: PropTypes.object,
};

export default PlaylistItem;
