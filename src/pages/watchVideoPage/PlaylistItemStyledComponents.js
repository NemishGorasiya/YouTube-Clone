import styledConfig from "../../utils/styledConfig";
import { Box, Skeleton } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";

export const VideoImageWrapper = styledConfig(Box)(({ theme }) => ({
  width: "140px",
  aspectRatio: "16/9",
  borderRadius: "8px",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
  },
}));

export const VideoImage = styledConfig("img")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const VideoThumbnailSkeleton = styledConfig(Skeleton)({
  borderRadius: "inherit",
});

export const PlaylistItemComponent = styledConfig(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
});

export const PlaylistContent = styledConfig(Box)({
  display: "flex",
  gap: "12px",
  flex: 1,
});

export const VideoTitle = styledConfig(MuiTypography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

export const ChannelName = styledConfig(MuiTypography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: theme.palette.primary.light,
  fontSize: "14px",
}));

export const IconButton = styledConfig(MuiIconButton)({
  height: "35px",
  width: "35px",
  padding: "5px",
});

export const MenuItem = styledConfig(MuiMenuItem)({
  gap: "4px",
});

export const VideoTitleWrapper = styledConfig(Box)({
  flex: 1,
});
