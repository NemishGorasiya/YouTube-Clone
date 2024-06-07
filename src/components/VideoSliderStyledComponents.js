import styledConfig from "../utils/styledConfig";
import { Box, Button, Typography } from "@mui/material";

export const PlaylistTitleWrapper = styledConfig(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const PlaylistTitleTypography = styledConfig(Typography)({
  margin: "8px 0",
  fontSize: "20px",
  fontWeight: "600",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const PlaylistViewAllButton = styledConfig(Button)({
  minWidth: "fit-content",
  height: "fit-content",
});
