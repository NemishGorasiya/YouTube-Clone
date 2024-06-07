import styledConfig from "../../utils/styledConfig";
import { Box, Typography } from "@mui/material";

export const PlaylistPanelComponent = styledConfig(Box)({
  padding: "0 12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  maxHeight: "inherit",
  maxWidth: "100%",
});

export const PlaylistPanelTitle = styledConfig(Typography)({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  flexShrink: 0,
  fontSize: "20px",
  fontWeight: 600,
  paddingTop: "4px",
});
