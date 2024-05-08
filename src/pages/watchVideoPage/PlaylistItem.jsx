import { Box, styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

const PlaylistItem = ({ playlistItem }) => {
  const {
    snippet: {
      title,
      thumbnails: {
        default: { url },
      },
      videoOwnerChannelTitle,
    },
  } = playlistItem;

  const VideoImageWrapper = styled(MuiBox)(() => ({
    minWidth: "100px",
    aspectRatio: "16/9",
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

  return (
    <PlaylistItemComponent>
      <VideoImageWrapper>
        <VideoImage src={url} alt="Video Thumbnail" />
      </VideoImageWrapper>
      <Box sx={{ flex: 1, width: "100px" }}>
        <VideoTitle>{title}</VideoTitle>
        <ChannelName>{videoOwnerChannelTitle}</ChannelName>
      </Box>
    </PlaylistItemComponent>
  );
};

export default PlaylistItem;
