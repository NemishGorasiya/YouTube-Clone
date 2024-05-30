import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardMedia from "@mui/material/CardMedia";
import MuiTypography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MuiCardActionArea from "@mui/material/CardActionArea";

export const Card = styled(MuiCard)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.primary.main,
}));

export const CardMedia = styled(MuiCardMedia)(() => ({
  borderRadius: "14px",
  aspectRatio: "25/14",
  height: "auto",
}));

export const CardMediaWrapper = styled(MuiBox)(() => ({
  position: "relative",
  width: "100%",
}));

export const VideoIsLiveIndicator = styled("span")(() => ({
  background: "red",
  fontSize: "12px",
  borderRadius: "2px",
  color: "#FFFFFF",
  marginRight: "4px",
  padding: "1px 4px",
}));

export const LiveTvStyledIcon = styled(LiveTvIcon)(() => ({
  fontSize: "12px",
  marginRight: "4px",
}));

export const VideoDurationBadge = styled(MuiBox)(() => ({
  position: "absolute",
  bottom: "8px",
  right: "12px",
  display: "flex",
  alignItems: "center",
  fontSize: "13px",
  background: "rgba(0,0,0,0.6)",
  fontWeight: "600",
  padding: "4px",
  borderRadius: "4px",
  color: "#fff",
}));

export const CardContent = styled(MuiCardContent)(() => ({
  padding: "0",
  display: "flex",
  gap: "8px",
  minWidth: "50%",
  alignItems: "start",
  flex: "1",
  width: "100%",
}));

export const ChannelThumbnail = styled("img")(() => ({
  height: "36px",
  width: "36px",
  borderRadius: "50%",
}));

export const CardActionArea = styled(MuiCardActionArea)(({ isListView }) => ({
  display: "flex",
  ...(isListView
    ? {
        gap: "16px",
        alignItems: "start",
      }
    : {
        gap: "8px",
        flexDirection: "column",
      }),
}));

export const VideoTitle = styled(MuiTypography)(() => ({
  lineHeight: "1.5",
  fontSize: "16px",
  fontWeight: "500",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
}));

export const ChannelName = styled(MuiTypography)(() => ({
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
}));

export const VideoMetadata = styled(MuiBox)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "14px",
}));

export const VideoDetail = styled(MuiBox)(() => ({
  flex: 1,
  overflow: "hidden",
}));

export const CheckCircleStyledIcon = styled(CheckCircleIcon)(() => ({
  marginLeft: "5px",
}));
