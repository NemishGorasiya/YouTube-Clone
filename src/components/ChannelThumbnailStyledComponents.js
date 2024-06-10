import { Box } from "@mui/material";
import styledConfig from "../utils/styledConfig";

export const ChannelThumbnailWrapper = styledConfig(Box)({
  height: "36px",
  width: "36px",
  borderRadius: "50%",
});

export const StyledChannelThumbnail = styledConfig("img")({
  height: "100%",
  width: "100%",
  borderRadius: "inherit",
});
