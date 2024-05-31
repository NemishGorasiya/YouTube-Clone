import { styled } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";

export const VideoImageWrapper = styled(MuiBox)(({ theme }) => ({
  width: "140px",
  aspectRatio: "16/9",
  borderRadius: "8px",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
  },
}));

export const VideoImage = styled("img")(() => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
}));

export const PlaylistItemComponent = styled(MuiBox)(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
}));

export const PlaylistContent = styled(MuiBox)(() => ({
  display: "flex",
  gap: "12px",
  flex: 1,
}));

export const VideoTitle = styled(MuiTypography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

export const ChannelName = styled(MuiTypography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: theme.palette.primary.light,
  fontSize: "14px",
}));

export const IconButton = styled(MuiIconButton)(() => ({
  height: "35px",
  width: "35px",
  padding: "5px",
}));

export const MenuItem = styled(MuiMenuItem)(() => ({
  gap: "4px",
}));
