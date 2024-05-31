import { Box, styled } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Divider = styled(MuiDivider)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

export const ChannelLink = styled(Link)(() => ({
  display: "flex",
  gap: "8px",
}));

export const VideoMetadataWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "start  ",
  },
}));

export const Tag = styled(MuiTypography)(() => ({
  display: "inline-block",
  marginRight: "4px",
  color: "#3EA6FF",
}));

export const UserActionButton = styled(MuiButton)(({ theme }) => ({
  background: theme.palette.secondaryBackground.default,
  color: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.secondaryBackground.light,
  },
}));

export const PlaylistPanelWrapper = styled(Box)(({ theme }) => ({
  maxHeight: "500px",
  background: theme.palette.background.light,
  padding: 3,
  borderRadius: "12px",
}));

export const VideoDescriptionContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.secondary,
  borderRadius: "8px",
  padding: "12px",
}));
